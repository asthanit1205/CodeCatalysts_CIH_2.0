// // // // const mongoose = require('mongoose');

// // // // const userSchema = new mongoose.Schema({
// // // //   name: String,
// // // //   email: { type: String, unique: true },
// // // //   passwordHash: String,
// // // //   role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
// // // //   phone: String,
// // // //   avatar: String,
// // // //   condition: String,
// // // //   assignedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
// // // //   sessionHistory: [{
// // // //     exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
// // // //     score: Number,
// // // //     repetitionsDone: Number,
// // // //     durationInSeconds: Number,
// // // //     timestamp: { type: Date, default: Date.now }
// // // //   }]
// // // // });

// // // // module.exports = mongoose.model('User', userSchema);


// // // const mongoose = require('mongoose');

// // // const userSchema = new mongoose.Schema({
// // //   name: String,
// // //   email: { type: String, unique: true },
// // //   passwordHash: String,
// // //   role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
// // //   phone: String,
// // //   avatar: String,
// // //   condition: String,

// // //   assignedExercises: [
// // //     { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }
// // //   ],

// // //   // ✅ New scores field
// // //   scores: [{
// // //     exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
// // //     score: Number,
// // //     repetitionsDone: Number,

// // //     durationInSeconds: Number,
// // //     date: { type: Date, default: Date.now }
// // //   }]
// // // });

// // // module.exports = mongoose.model('User', userSchema);



// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   name: String,
// //   email: { type: String, unique: true },
// //   passwordHash: String,
// //   role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
// //   phone: String,
// //   avatar: String,
// //   condition: String,

// //   assignedExercises: [
// //     { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }
// //   ],

// //   sessionHistory: [{
// //     exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
// //     score: Number,
// //     repetitionsDone: Number,
// //     durationInSeconds: Number,
// //     timestamp: { type: Date, default: Date.now }
// //   }]
// // });

// // module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   passwordHash: String,
//   role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
//   phone: String,
//   avatar: String,
//   condition: String,

//   assignedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],

//   sessionHistory: [{
//     exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
//     score: Number,
//     repetitionsDone: Number,
//     durationInSeconds: Number,
//     timestamp: { type: Date, default: Date.now }
//   }]
// });

// module.exports = mongoose.model('User', userSchema);




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['patient', 'physiotherapist'], required: true },
  phone: String,
  avatar: String,
  condition: String,

  assignedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],

  sessionHistory: {
    type: [{
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
      score: Number,
      repetitionsDone: Number,
      durationInSeconds: Number,
      timestamp: { type: Date, default: Date.now }
    }],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
