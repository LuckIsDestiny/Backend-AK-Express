const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPwd, role });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log({
      token, user: {
        name: user.name,
        email: user.email, role: user.role
      }
    });
    res.json({
      token, user: {
        name: user.name,
        email: user.email, role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};

// exports.logout = async (_req, res) => {
//   try {
//     // Clear token from client
//     res.clearCookie('token', {
//       httpOnly: true,
//       secure: false, 
//       sameSite: 'Lax'
//     });
//     res.status(200).json({ msg: 'Logged out successfully' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Logout failed', error: err.message });
//   }
// };
