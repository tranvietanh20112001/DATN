// models/Product.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link_Youtube_URL: {
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    grade:{
        type: Number,
        required: true,
    },
    file_report_URL:{
        type: String,
    },
    image_project_URL:{
            data: Buffer,
            contentType: String
    }
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
