const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// ✅ Get all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json({ exercises });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching exercises', error: err.message });
  }
});

module.exports = router;
