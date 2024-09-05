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
        const {title, link_Youtube_URL,year,grade} = req.body;

        const newProject = new Project({
            title,
            link_Youtube_URL,
            year,
            grade,
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
  module.exports = router;