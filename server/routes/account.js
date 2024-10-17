const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require("multer");

const Account = require('../models/account');
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Admin tạo tài khoản mới
router.post('/create-new-account', async (req, res) => {
  const { email, password, role, full_name } = req.body;

  try {
    const accountExists = await Account.findOne({ email });
    if (accountExists) return res.status(400).json({ message: 'account already exists' });

    const newaccount = new account({ email, password, role, full_name });
    await newaccount.save();

    res.status(201).json({ message: 'account registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering account' });
    console.log(error)
  }
});

// Guest đăng ký tài khoản mới
router.post('/register-new-account', async (req, res) => {
  const { email, password, role, full_name } = req.body;

  try {
    const accountExists = await Account.findOne({ email });
    if (accountExists) return res.status(400).json({ message: 'account already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newaccount = new account({
      email,
      password: hashedPassword,  
      role,
      full_name
    });

    await newaccount.save();

    const token = jwt.sign({ accountId: newaccount._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ message: 'account registered and logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering account' });
    console.log(error);
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });
    if (!account) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Tạo JWT
    const token = jwt.sign({ accountId: account._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get-account-profile', authenticateToken, async (req, res) => {
  try {
    const accountId = req.account.accountId;
    const account = await Account.findById(accountId).select('-password'); 

    if (!account) return res.status(404).json({ message: 'account not found' });

    res.json(account); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account profile' });
  }
});

router.get('/get-all-accounts', async(req,res) =>{
  try {
    const accounts= await Account.find().sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put("/update-account/:id", upload.single("image"), async (req, res) => {
  try {
    const { full_name, description, phone_number,campus,faculty } = req.body;
    const image = req.file ? req.file.filename : null;

    const updateFields = {
      full_name, description, phone_number,campus,faculty
    };

    if (image) {
      updateFields.image = image;
    }

    const updatedaccount = await Account.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedaccount) {
      return res.status(404).json({ success: false, message: "account not found" });
    }

    res.status(200).json({
      success: true,
      message: "account updated successfully",
      account: updatedaccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/delete-account/:id", async (req, res) => {
  try {
    const deletedaccount = await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: deletedaccount})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/update-profile/:accountId', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const accountId = req.account.accountId; // Lấy accountId từ token đã được xác thực
    const { full_name, description, phone_number, campus, faculty } = req.body;
    const image = req.file ? req.file.filename : null; // Kiểm tra nếu có ảnh upload

    const updateFields = {
      full_name, 
      description, 
      phone_number, 
      campus, 
      faculty,
    };

    if (image) {
      updateFields.image = image; // Nếu có ảnh, cập nhật image
    }

    // Tìm tài khoản và cập nhật
    const updatedAccount = await Account.findByIdAndUpdate(accountId, updateFields, { new: true });

    if (!updatedAccount) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // Trả về kết quả sau khi cập nhật thành công
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      account: updatedAccount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// User changes their own password
router.put('/change-password', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const accountId = req.account.accountId; 
  
  try {
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const isMatch = await bcrypt.compare(oldPassword, account.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedPassword;
    await account.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error changing password' });
  }
});

// Admin changes another user's password
router.put('/admin-change-password/:id', async (req, res) => {
  const { newPassword } = req.body;
  const accountId = req.params.id;
  
  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedPassword;
    await account.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error changing password' });
  }
});


module.exports = router;
