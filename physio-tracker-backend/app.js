// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes'); // 👈 import

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Mount the user routes
// app.use('/api/users', userRoutes); // 👈 use

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("✅ MongoDB Connected");
// }).catch(err => {
//   console.error("❌ MongoDB Error:", err);
// });

// // Default route
// app.get("/", (req, res) => {
//   res.send("Physio Tracker Backend is Running!");
// });

// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`🚀 Server started on http://localhost:${process.env.PORT}`);
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch(err => {
  console.error("❌ MongoDB Error:", err);
});

app.get('/', (req, res) => {
  res.send('Physio Tracker Backend is Running!');
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
