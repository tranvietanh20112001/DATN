const express = require("express");
const router = express.Router();
const multer = require("multer");

const student = require("../models/student")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-students", async (req, res) => {
    try {
      const students= await student.find().sort({ createdAt: -1 });
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-student",  upload.single("image"), async(req,res) =>{
    try{
        const {full_name, description, email, campus, faculty, personal_email, MSSV} = req.body;
        const image = req.file ? req.file.filename : null;

        const newstudent = new student({
            full_name,
            description,
            image,
            email,
            personal_email,
            MSSV,
            campus,
            faculty
        });

        await newstudent.save();

        console.log(newstudent);
    res.status(200).json({
      success: true,
      message: "student created successfully",
      students: newstudent,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.delete("/delete-student/:id", async (req, res) => {
  try {
    const deletedstudent = await student.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  module.exports = router;