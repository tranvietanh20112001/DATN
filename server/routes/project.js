const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const campus = require("../models/campus");
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import multer from "multer";
import config from "../config/firebase.config"

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

initializeApp(config.firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/test-upload", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});


router.get("/get-all-projects", async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.post('/:id/view', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      project.number_of_views += 1;
      await project.save();
      res.status(200).json({ project: project.views });
    } catch (error) {
      res.status(500).json({ message: 'Error updating views' });
    }
});

router.get("/get-project-by-id/:id", async (req, res) => {
    const id = req.params.id;
    try {  
      const response = await Project.findById(id);
      res.json(response);  
    } catch (error) {
      console.log(error);
    }
});

router.post("/create-new-project", upload.fields([
    { name: 'report_pdf', maxCount: 1 },
    { name: 'img_banner', maxCount: 1 }
]), async (req, res) => {
    try {
      const {
        title,
        link_Youtube_URL,
        link_demo_project,
        year,
        grade,
        faculty,
        campus,
        teacher_name,
        teacher_id,
        student_name,
        student_id,
        description
      } = JSON.parse(req.body.data);
  
      const fileReportUrl = req.files['report_pdf'] ? req.files['report_pdf'][0].path : '';
      const imgBannerUrl = req.files['img_banner'] ? req.files['img_banner'][0].filename : '';
  
      const newProject = new Project({
        title,
        link_Youtube_URL,
        link_demo_project,
        year,
        grade,
        faculty,
        campus,
        teacher_name,
        teacher_id,
        student_name,
        student_id,
        file_report_URL: fileReportUrl,
        link_img_banner: imgBannerUrl, 
        description
      });
  
      await newProject.save();
  
      console.log(newProject);
      res.status(200).json({
        success: true,
        message: "Project created successfully",
        projects: newProject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.delete("/delete-project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Dự án đã được xóa thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa dự án" });
  }
});

router.delete('/delete-all-projects', async (req, res) => {
  try {
    await Project.deleteMany({});
    res.status(200).send('All products have been deleted');
  } catch (error) {
    res.status(500).send('Error deleting products');
  }
});

router.put('/update-project/:id', async (req, res)  => {
  try {
    const projectId = req.params.id;
    const updatedData = req.body;

    if (updatedData.grade < 40 || updatedData.grade > 100) {
      return res.status(400).json({ message: 'Grade must be between 40 and 100' });
    }
    const project = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

router.get('/get-projects-by-campus/:campusId', async (req, res) => {
  try {
      const { campusId } = req.params;
      const campusSelected = await campus.findById(campusId);

      if (!campusSelected) {
        return res.status(404).json({ message: 'Campus not found.' });
    }

      const projects = await Project.find({campus: campusSelected.name});
      
      if (projects.length === 0) {
          return res.status(404).json({ message: 'No projects found for this class.' });
      }
      
      res.json(projects);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.get('/get-project-by-studentId/:studentId', async (req, res) => {
  try {
      const { studentId } = req.params;

      if (!studentId) {
        return res.status(404).json({ message: 'Student not found.' });
    }

      const projects = await Project.find({student_id: studentId});
      
      if (projects.length === 0) {
          return res.status(404).json({ message: 'No projects found for this class.' });
      }
      
      res.json(projects);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
