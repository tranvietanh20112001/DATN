const express = require("express");
const router = express.Router();
const multer = require("multer");

const campus = require("../models/campus")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-campuses", async (req, res) => {
    try {
      const campuss= await campus.find().sort({ createdAt: -1 });
      res.json(campuss);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-campus",  upload.single("image"), async(req,res) =>{
    try{
        const {name, description, location} = req.body;
        const image = req.file ? req.file.filename : null;

        const newcampus = new campus({
            name,
            description,
            location,
            image
        });

        await newcampus.save();

        console.log(newcampus);
    res.status(200).json({
      success: true,
      message: "campus created successfully",
      campuss: newcampus,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.delete("/delete-campus/:id", async (req, res) => {
  try {
    const deletedCampus = await campus.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  module.exports = router;