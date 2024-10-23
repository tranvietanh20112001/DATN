const express = require("express");
const router = express.Router();
const multer = require('multer');
const Project = require("../models/project")
const campus = require("../models/campus");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


// Get All Projects
router.get("/get-all-projects", async (req, res) => {
    try {
      const projects= await Project.find().sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // Update number of views
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


  // Get Project By ID
  router.get("/get-project-by-id/:id", async (req, res) => {
    const id = req.params.id;
    try{  
      const response = await Project.findById(id);
      res.json(response);  
    }catch(error){
      console.log(error);
    }
  });


  // Create new projects
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
    const project = await Project.findByIdAndUpdate(projectId, updatedData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});


// Route to get students by campusID
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


// Route to get students by campusID
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