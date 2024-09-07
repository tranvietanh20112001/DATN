const express = require("express");
const router = express.Router();
const multer = require("multer");

const teacher = require("../models/teacher")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-teachers", async (req, res) => {
    try {
      const teachers= await teacher.find().sort({ createdAt: -1 });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-teacher",  upload.single("image"), async(req,res) =>{
    try{
        const {full_name, description, email, campus, faculty} = req.body;
        const image = req.file ? req.file.filename : null;

        const newTeacher = new teacher({
            full_name,
            description,
            image,
            email,
            campus,faculty
        });

        await newTeacher.save();

        console.log(newTeacher);
    res.status(200).json({
      success: true,
      message: "teacher created successfully",
      teachers: newTeacher,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.delete("/delete-teacher/:id", async (req, res) => {
  try {
    const deletedteacher = await teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  module.exports = router;