const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateToken = require("../middleware/auth");
const router = express.Router();

// Đăng ký
router.post('/create-new-account', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
    console.log(error)
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Tạo JWT
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.get('/get-user-profile', authenticateToken, async (req, res) => {
  try {
    // Giải mã JWT và lấy userId từ token
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password'); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

router.get('/get-all-accounts', async(req,res) =>{
  try {
    const users= await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


module.exports = router;
