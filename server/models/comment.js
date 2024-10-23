const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Nội dung không được để trống"],
  },
  project_id: {
    type: String,
    required: [true, "Dự án không được để trống"],
  },
  account_id: {
    type: String,
    required: [true, "Người dùng không được để trống"],
  },
}, {
  timestamps: true,
});


const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;