

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');

// ✅ Get all users (for dropdown)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'patient' }).populate('assignedExercises');
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// ✅ Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, passwordHash, role, phone, avatar, condition } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const newUser = new User({ name, email, passwordHash, role, phone, avatar, condition });
    await newUser.save();

    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
});

// ✅ Login user
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Login success', user });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

// ✅ Assign exercises to a patient
router.post('/assign-exercise/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { exerciseIds } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newExercises = exerciseIds.filter(id => !user.assignedExercises.includes(id));
    user.assignedExercises.push(...newExercises);
    await user.save();

    await user.populate('assignedExercises');

    res.status(200).json({ message: 'Exercises assigned', assignedExercises: user.assignedExercises });
  } catch (err) {
    res.status(500).json({ message: 'Assignment error', error: err.message });
  }
});

// ✅ Get assigned exercises
router.get('/:userId/exercises', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('assignedExercises');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ exercises: user.assignedExercises });
  } catch (err) {
    res.status(500).json({ message: 'Fetch error', error: err.message });
  }
});

// ✅ Submit exercise score
router.post('/:userId/submit-score', async (req, res) => {
  try {
    const { userId } = req.params;
    const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const session = {
      exercise: exerciseId,
      score,
      repetitionsDone,
      durationInSeconds,
      timestamp: new Date()
    };

    user.sessionHistory.push(session);
    await user.save();

    res.status(200).json({ message: 'Score recorded', session });
  } catch (err) {
    res.status(500).json({ message: 'Error saving score', error: err.message });
  }
});

// ✅ Get session history
router.get('/:userId/session-history', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('sessionHistory.exercise');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ history: user.sessionHistory });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session history', error: err.message });
  }
});

module.exports = router;

