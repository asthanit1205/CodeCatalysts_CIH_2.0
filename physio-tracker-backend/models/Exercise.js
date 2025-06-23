const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  targetBodyPart: String,
  repetitions: Number,
  durationInSeconds: Number
  
});

module.exports = mongoose.model('Exercise', exerciseSchema);
