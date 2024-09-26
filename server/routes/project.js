const express = require("express");
const router = express.Router();
const multer = require('multer');
const Project = require("../models/project")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/get-all-projects", async (req, res) => {
    try {
      const projects= await Project.find().sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-project", upload.single('report_pdf'), async(req,res) =>{
    try{
        const {title,
          link_Youtube_URL,
          link_demo_project,
          year,
          grade,
          faculty,
          campus,
          teacher_name,
          teacher_id,
          student_name,
          student_id,} = JSON.parse(req.body.data);

          const fileReportUrl = req.file ? req.file.path : '';

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
          file_report_URL: fileReportUrl
        });

        await newProject.save();

        console.log(newProject);
    res.status(200).json({
      success: true,
      message: "Project created successfully",
      projects: newProject,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

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
  module.exports = router;