const express = require("express");
const router = express.Router();
const multer = require("multer");

const faculty = require("../models/faculty")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-faculties", async (req, res) => {
    try {
      const faculties= await faculty.find().sort({ createdAt: -1 });
      res.json(faculties);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-faculty",  upload.single("image"), async(req,res) =>{
    try{
        const {name, campus, description} = req.body;

        const newfaculty = new faculty({
            name,
            campus,
            description
        });

        await newfaculty.save();

        console.log(newfaculty);
    res.status(200).json({
      success: true,
      message: "faculty created successfully",
      facultys: newfaculty,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.delete("/delete-faculty/:id", async (req, res) => {
  try {
    const deletedfaculty = await faculty.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/get-faculties-by-campus', async (req, res) => {
  const campusName = req.query.campus;
  try {
    const faculties = await faculty.find({ campus: campusName });
    res.json(faculties);
  } catch (error) {
    res.status(500).send('Error fetching classes');
  }
});

  module.exports = router;