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

  router.get("/get-student-by-id", async (req, res) => {
    try {
      const { _id } = req.query;
      
      if (!_id) {
        return res.status(400).json({ message: 'Student ID is required' });
      }
  
      const result = await student.findOne({ _id }); 
      
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
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
    console.log(deletedstudent)
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update-student/:id", upload.single("image"), async (req, res) => {
  try {
    const { full_name, description, email, campus, faculty, MSSV, personal_email } = req.body;
    const image = req.file ? req.file.filename : null;

    const updateFields = {
      full_name,
      description,
      email,
      campus,
      faculty,
      MSSV, personal_email
    };

    if (image) {
      updateFields.image = image;
    }

    const updatedStudent = await student.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.MSSV; 

  try {
    const students = await student.findOne({ MSSV: { $regex: searchQuery, $options: 'i' } }); 
    res.json(students); 
  } catch (err) {
    res.status(500).json({ error: 'Error occurred while searching for students' });
  }
});

module.exports = router;
