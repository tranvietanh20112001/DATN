const express = require("express");
const router = express.Router();

const Project = require("../models/project")

router.get("/get-all-projects", async (req, res) => {
    try {
      const projects= await Project.find().sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-project", async(req,res) =>{
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
          student_id,} = req.body;

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

router.delete('/delete-all-projects', async (req, res) => {
  try {
    await Project.deleteMany({});
    res.status(200).send('All products have been deleted');
  } catch (error) {
    res.status(500).send('Error deleting products');
  }
});
  module.exports = router;