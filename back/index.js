// server.js
import express from 'express';
const app = express();
const PORT = 3000;

import 'dotenv/config.js';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// ENABLE CORS AND JSON PARSING
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('db connected'))
  .catch(() => console.log('error in db connection'));


// ===================== USER AUTH =========================

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema, 'users');

// SIGNUP
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) return res.status(400).json({ message: 'All fields required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', err });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
});

// AUTH MIDDLEWARE
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId and email now available
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// ===================== WEIGHT TRACKER =======================

const weightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  wgt: Number,
});

const Weight = mongoose.model('Weight', weightSchema, 'weighttracker');

// GET USER-SPECIFIC DATA
app.get('/wgt', authenticate, async (req, res) => {
  try {
    const weight = await Weight.find({ userId: req.user.userId });
    res.json(weight);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error in fetching data', err });
  }
});

// POST USER-SPECIFIC DATA
app.post('/wgt', authenticate, async (req, res) => {
  const { date, wgt } = req.body;
  if (!date || !wgt) return res.status(400).json({ error: 'Date and weight are required' });

  try {
    const newWeight = new Weight({ date, wgt, userId: req.user.userId });
    const savedWeight = await newWeight.save();
    res.status(201).json(savedWeight);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving data', err });
  }
});


// ==================== STUDENT SCHEMA =======================

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  regno: Number,
});

const Student = mongoose.model('Students', studentSchema, 'ruchinew001');

// GET
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', err });
  }
});

// POST
app.post('/students', async (req, res) => {
  const { name, course, regno } = req.body;
  if (!name || !course) return res.status(400).json({ error: 'Name and course are required' });

  try {
    const newStudent = new Student({ name, course, regno });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error saving student', error });
  }
});


// ===================== CONTACT FORM =======================

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema, 'contactform');

// GET CONTACTS
app.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching contacts', err });
  }
});

// POST CONTACT
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });

  try {
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving contact', err });
  }
});


// ====================== SERVER ============================

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});
