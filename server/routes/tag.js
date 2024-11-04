const express = require('express');
const Tag = require('../models/tag'); 
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

  
// Create a new tag
router.post('/create-new-tag',  upload.single("image"), async (req, res) => {
    try {
        const { name, description, color } = req.body;
        const newTag = new Tag({ name, description, color });
        await newTag.save();
        res.status(201).json({ success: true, message: 'Tag created successfully', tag: newTag });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all tags
router.get('/get-all-tags', async (req, res) => {
    try {
        const tags = await Tag.find().sort({ createdAt: -1 });;
        res.status(200).json( tags );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single tag by ID
router.get('/get-tag-by-id/:id', async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });
        res.status(200).json({ success: true, tag });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a tag by ID
router.put('/update-tag/:id', upload.single("image"), async (req, res) => {
    try {
        const { name, description, color } = req.body;
        const updatedTag = await Tag.findByIdAndUpdate(
            req.params.id,
            { name, description, color },
            { new: true, runValidators: true }
        );
        if (!updatedTag) return res.status(404).json({ success: false, message: 'Tag not found' });
        res.status(200).json({ success: true, message: 'Tag updated successfully', tag: updatedTag });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a tag by ID
router.delete('/delete-tag/:id', async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        if (!deletedTag) return res.status(404).json({ success: false, message: 'Tag not found' });
        res.status(200).json({ success: true, message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
