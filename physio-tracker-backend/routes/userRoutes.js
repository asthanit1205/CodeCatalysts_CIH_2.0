// // // // // // // const express = require('express');
// // // // // // // const router = express.Router();
// // // // // // // const User = require('../models/User');
// // // // // // // const Exercise = require('../models/Exercise');

// // // // // // // // Register user
// // // // // // // router.post('/register', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const user = new User(req.body);
// // // // // // //     await user.save();
// // // // // // //     res.status(201).json({ message: 'User registered', user });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Registration error', error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Login user
// // // // // // // router.post('/login', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { email } = req.body;
// // // // // // //     const user = await User.findOne({ email });
// // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });
// // // // // // //     res.status(200).json({ message: 'Login success', user });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Login error', error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Assign exercises
// // // // // // // router.post('/assign-exercise/:userId', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { userId } = req.params;
// // // // // // //     const { exerciseIds } = req.body;

// // // // // // //     const user = await User.findById(userId);
// // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // //     user.assignedExercises.push(...exerciseIds);
// // // // // // //     await user.save();

// // // // // // //     res.status(200).json({ message: 'Exercises assigned', user });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Assignment error', error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Get assigned exercises
// // // // // // // router.get('/:userId/exercises', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const user = await User.findById(req.params.userId).populate('assignedExercises');
// // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // //     res.status(200).json({ exercises: user.assignedExercises });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Fetch error', error: err.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // // // 🆕 Submit score for a completed exercise
// // // // // // // // router.post('/:userId/submit-score', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { userId } = req.params;
// // // // // // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // // // // // //     const user = await User.findById(userId);
// // // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // // //     user.sessionHistory.push({
// // // // // // // //       exercise: exerciseId,
// // // // // // // //       score,
// // // // // // // //       repetitionsDone,
// // // // // // // //       durationInSeconds,
// // // // // // // //       timestamp: new Date()
// // // // // // // //     });

// // // // // // // //     await user.save();

// // // // // // // //     res.status(200).json({ message: 'Score recorded', sessionHistory: user.sessionHistory });
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // module.exports = router;

// // // // // // // // // Submit score for a specific exercise
// // // // // // // // router.post('/:userId/submit-score', async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { userId } = req.params;
// // // // // // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // // // // // //     const user = await User.findById(userId);
// // // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // // //     const exerciseScore = {
// // // // // // // //       exerciseId,
// // // // // // // //       score,
// // // // // // // //       repetitionsDone,
// // // // // // // //       durationInSeconds,
// // // // // // // //       date: new Date()
// // // // // // // //     };

// // // // // // // //     user.scores.push(exerciseScore);
// // // // // // // //     await user.save();

// // // // // // // //     res.status(200).json({ message: 'Score recorded', score: exerciseScore });
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: 'Score submission error', error: err.message });
// // // // // // // //   }
// // // // // // // // });


// // // // // // // // Submit score for a completed exercise
// // // // // // // router.post('/:userId/submit-score', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { userId } = req.params;
// // // // // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // // // // //     const user = await User.findById(userId);
// // // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // // //     user.scores.push({
// // // // // // //       exerciseId,
// // // // // // //       score,
// // // // // // //       repetitionsDone,
// // // // // // //       durationInSeconds
// // // // // // //     });

// // // // // // //     await user.save();

// // // // // // //     res.status(200).json({ message: 'Score recorded', scores: user.scores });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // // // // // //   }
// // // // // // // });



// // // // // // const express = require('express');
// // // // // // const router = express.Router();
// // // // // // const User = require('../models/User');
// // // // // // const Exercise = require('../models/Exercise');

// // // // // // // 🟢 Register a new user
// // // // // // router.post('/register', async (req, res) => {
// // // // // //   try {
// // // // // //     const user = new User(req.body);
// // // // // //     await user.save();
// // // // // //     res.status(201).json({ message: 'User registered', user });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Registration error', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // 🟢 Login user
// // // // // // router.post('/login', async (req, res) => {
// // // // // //   try {
// // // // // //     const { email } = req.body;
// // // // // //     const user = await User.findOne({ email });
// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });
// // // // // //     res.status(200).json({ message: 'Login success', user });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Login error', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // 🟢 Assign exercises to a user
// // // // // // router.post('/assign-exercise/:userId', async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId } = req.params;
// // // // // //     const { exerciseIds } = req.body;

// // // // // //     const user = await User.findById(userId);
// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // //     user.assignedExercises.push(...exerciseIds);
// // // // // //     await user.save();

// // // // // //     res.status(200).json({ message: 'Exercises assigned', user });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Assignment error', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // 🟢 Get assigned exercises for a user
// // // // // // router.get('/:userId/exercises', async (req, res) => {
// // // // // //   try {
// // // // // //     const user = await User.findById(req.params.userId).populate('assignedExercises');
// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // //     res.status(200).json({ exercises: user.assignedExercises });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Fetch error', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // 🟢 Submit score for an exercise
// // // // // // router.post('/:userId/submit-score', async (req, res) => {
// // // // // //   try {
// // // // // //     const { userId } = req.params;
// // // // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // // // //     const user = await User.findById(userId);
// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // //     user.scores.push({
// // // // // //       exerciseId,
// // // // // //       score,
// // // // // //       repetitionsDone,
// // // // // //       durationInSeconds,
// // // // // //       date: new Date()
// // // // // //     });

// // // // // //     await user.save();

// // // // // //     res.status(200).json({ message: 'Score recorded', scores: user.scores });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // // 🟢 Get session history for a user
// // // // // // router.get('/:userId/session-history', async (req, res) => {
// // // // // //   try {
// // // // // //     const user = await User.findById(req.params.userId)
// // // // // //       .populate('scores.exerciseId');

// // // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // // //     res.status(200).json({ history: user.scores });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: 'Error fetching session history', error: err.message });
// // // // // //   }
// // // // // // });

// // // // // // module.exports = router;


// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const User = require('../models/User');
// // // // // const Exercise = require('../models/Exercise');

// // // // // // Register user
// // // // // router.post('/register', async (req, res) => {
// // // // //   try {
// // // // //     const user = new User(req.body);
// // // // //     await user.save();
// // // // //     res.status(201).json({ message: 'User registered', user });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Registration error', error: err.message });
// // // // //   }
// // // // // });

// // // // // // Login user
// // // // // router.post('/login', async (req, res) => {
// // // // //   try {
// // // // //     const { email } = req.body;
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });
// // // // //     res.status(200).json({ message: 'Login success', user });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Login error', error: err.message });
// // // // //   }
// // // // // });

// // // // // // Assign exercises
// // // // // router.post('/assign-exercise/:userId', async (req, res) => {
// // // // //   try {
// // // // //     const { userId } = req.params;
// // // // //     const { exerciseIds } = req.body;

// // // // //     const user = await User.findById(userId);
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // //     user.assignedExercises.push(...exerciseIds);
// // // // //     await user.save();

// // // // //     res.status(200).json({ message: 'Exercises assigned', user });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Assignment error', error: err.message });
// // // // //   }
// // // // // });

// // // // // // Get assigned exercises
// // // // // router.get('/:userId/exercises', async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.params.userId).populate('assignedExercises');
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // //     res.status(200).json({ exercises: user.assignedExercises });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Fetch error', error: err.message });
// // // // //   }
// // // // // });

// // // // // // Submit score for a completed exercise
// // // // // router.post('/:userId/submit-score', async (req, res) => {
// // // // //   try {
// // // // //     const { userId } = req.params;
// // // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // // //     const user = await User.findById(userId);
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // //     // ✅ Initialize sessionHistory if it doesn't exist (for old user records)
// // // // //     if (!user.sessionHistory) {
// // // // //       user.sessionHistory = [];
// // // // //     }

// // // // //     user.sessionHistory.push({
// // // // //       exercise: exerciseId,
// // // // //       score,
// // // // //       repetitionsDone,
// // // // //       durationInSeconds,
// // // // //       timestamp: new Date()
// // // // //     });

// // // // //     await user.save();

// // // // //     res.status(200).json({ message: 'Score recorded', sessionHistory: user.sessionHistory });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // // // //   }
// // // // // });


// // // // // // ✅ Get session history
// // // // // router.get('/:userId/session-history', async (req, res) => {
// // // // //   try {
// // // // //     const user = await User.findById(req.params.userId).populate('sessionHistory.exercise');
// // // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // // //     res.status(200).json({ history: user.sessionHistory });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: 'Error fetching session history', error: err.message });
// // // // //   }
// // // // // });

// // // // // module.exports = router;



// // // // // Submit score using sessionHistory
// // // // router.post('/:userId/submit-score', async (req, res) => {
// // // //   try {
// // // //     const { userId } = req.params;
// // // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // // //     const user = await User.findById(userId);
// // // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // // //     // ✅ Ensure sessionHistory exists
// // // //     if (!user.sessionHistory) user.sessionHistory = [];

// // // //     // ✅ Push new session data
// // // //     user.sessionHistory.push({
// // // //       exercise: exerciseId,
// // // //       score,
// // // //       repetitionsDone,
// // // //       durationInSeconds,
// // // //       timestamp: new Date()
// // // //     });

// // // //     await user.save();

// // // //     res.status(200).json({ message: 'Score recorded', sessionHistory: user.sessionHistory });
// // // //   } catch (err) {
// // // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // // //   }
// // // // });








// // // const express = require('express');
// // // const router = express.Router();
// // // const User = require('../models/User');
// // // const Exercise = require('../models/Exercise');

// // // // ✅ Register user
// // // router.post('/register', async (req, res) => {
// // //   try {
// // //     const user = new User(req.body);
// // //     await user.save();
// // //     res.status(201).json({ message: 'User registered', user });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Registration error', error: err.message });
// // //   }
// // // });

// // // // ✅ Login user
// // // router.post('/login', async (req, res) => {
// // //   try {
// // //     const { email } = req.body;
// // //     const user = await User.findOne({ email });
// // //     if (!user) return res.status(404).json({ message: 'User not found' });
// // //     res.status(200).json({ message: 'Login success', user });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Login error', error: err.message });
// // //   }
// // // });

// // // // ✅ Assign exercises
// // // router.post('/assign-exercise/:userId', async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;
// // //     const { exerciseIds } = req.body;

// // //     const user = await User.findById(userId);
// // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // //     user.assignedExercises.push(...exerciseIds);
// // //     await user.save();

// // //     res.status(200).json({ message: 'Exercises assigned', user });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Assignment error', error: err.message });
// // //   }
// // // });

// // // // ✅ Get assigned exercises
// // // router.get('/:userId/exercises', async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.params.userId).populate('assignedExercises');
// // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // //     res.status(200).json({ exercises: user.assignedExercises });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Fetch error', error: err.message });
// // //   }
// // // });

// // // // ✅ Submit score (uses sessionHistory)
// // // router.post('/:userId/submit-score', async (req, res) => {
// // //   try {
// // //     const { userId } = req.params;
// // //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// // //     const user = await User.findById(userId);
// // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // //     if (!Array.isArray(user.sessionHistory)) user.sessionHistory = [];

// // //     user.sessionHistory.push({
// // //       exercise: exerciseId,
// // //       score,
// // //       repetitionsDone,
// // //       durationInSeconds,
// // //       timestamp: new Date()
// // //     });

// // //     await user.save();

// // //     res.status(200).json({ message: 'Score recorded', sessionHistory: user.sessionHistory });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Error saving score', error: err.message });
// // //   }
// // // });

// // // // ✅ Get session history
// // // router.get('/:userId/session-history', async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.params.userId).populate('sessionHistory.exercise');
// // //     if (!user) return res.status(404).json({ message: 'User not found' });

// // //     res.status(200).json({ history: user.sessionHistory });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Error fetching session history', error: err.message });
// // //   }
// // // });

// // // module.exports = router;



// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User');
// // const Exercise = require('../models/Exercise');

// // // ✅ Register user
// // router.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, passwordHash, role, phone, avatar, condition } = req.body;

// //     if (!email || !role) {
// //       return res.status(400).json({ message: 'Email and role are required' });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(409).json({ message: 'User already exists' });

// //     const newUser = new User({ name, email, passwordHash, role, phone, avatar, condition });
// //     await newUser.save();

// //     res.status(201).json({ message: 'User registered', user: newUser });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Registration error', error: err.message });
// //   }
// // });

// // // ✅ Login user
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     if (!email) return res.status(400).json({ message: 'Email required' });

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     res.status(200).json({ message: 'Login success', user });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Login error', error: err.message });
// //   }
// // });

// // // ✅ Assign exercises to a patient
// // router.post('/assign-exercise/:userId', async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { exerciseIds } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     // Avoid duplicate exercises
// //     const newExercises = exerciseIds.filter(
// //       id => !user.assignedExercises.includes(id)
// //     );
// //     user.assignedExercises.push(...newExercises);
// //     await user.save();

// //     res.status(200).json({ message: 'Exercises assigned', assignedExercises: user.assignedExercises });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Assignment error', error: err.message });
// //   }
// // });

// // // ✅ Get assigned exercises
// // router.get('/:userId/exercises', async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.userId).populate('assignedExercises');
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     res.status(200).json({ exercises: user.assignedExercises });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Fetch error', error: err.message });
// //   }
// // });

// // // ✅ Submit exercise score
// // router.post('/:userId/submit-score', async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const session = {
// //       exercise: exerciseId,
// //       score,
// //       repetitionsDone,
// //       durationInSeconds,
// //       timestamp: new Date()
// //     };

// //     user.sessionHistory.push(session);
// //     await user.save();

// //     res.status(200).json({ message: 'Score recorded', session });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error saving score', error: err.message });
// //   }
// // });

// // // ✅ Get session history for a patient
// // router.get('/:userId/session-history', async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.userId).populate('sessionHistory.exercise');
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     res.status(200).json({ history: user.sessionHistory });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error fetching session history', error: err.message });
// //   }
// // });

// // module.exports = router;





// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Exercise = require('../models/Exercise');

// // ✅ Get all users (for dropdown)
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ users });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// });

// // ✅ Register user
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, passwordHash, role, phone, avatar, condition } = req.body;

//     if (!email || !role) {
//       return res.status(400).json({ message: 'Email and role are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(409).json({ message: 'User already exists' });

//     const newUser = new User({ name, email, passwordHash, role, phone, avatar, condition });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration error', error: err.message });
//   }
// });

// // ✅ Login user
// router.post('/login', async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: 'Email required' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ message: 'Login success', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Login error', error: err.message });
//   }
// });

// // ✅ Assign exercises to a patient
// router.post('/assign-exercise/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { exerciseIds } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const newExercises = exerciseIds.filter(id => !user.assignedExercises.includes(id));
//     user.assignedExercises.push(...newExercises);
//     await user.save();

//     res.status(200).json({ message: 'Exercises assigned', assignedExercises: user.assignedExercises });
//   } catch (err) {
//     res.status(500).json({ message: 'Assignment error', error: err.message });
//   }
// });

// // ✅ Get assigned exercises
// router.get('/:userId/exercises', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('assignedExercises');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ exercises: user.assignedExercises });
//   } catch (err) {
//     res.status(500).json({ message: 'Fetch error', error: err.message });
//   }
// });

// // ✅ Submit exercise score
// router.post('/:userId/submit-score', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { exerciseId, score, repetitionsDone, durationInSeconds } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const session = {
//       exercise: exerciseId,
//       score,
//       repetitionsDone,
//       durationInSeconds,
//       timestamp: new Date()
//     };

//     user.sessionHistory.push(session);
//     await user.save();

//     res.status(200).json({ message: 'Score recorded', session });
//   } catch (err) {
//     res.status(500).json({ message: 'Error saving score', error: err.message });
//   }
// });

// // ✅ Get session history
// router.get('/:userId/session-history', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate('sessionHistory.exercise');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({ history: user.sessionHistory });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching session history', error: err.message });
//   }
// });

// module.exports = router;








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

