// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const connectDB = require('./config/db');

// const studentRoutes = require('./routes/studentRoutes');
// const courseRoutes = require('./routes/courseRoutes');

// dotenv.config();

// const app = express();


// // ============================================================
// // DATABASE
// // ============================================================

// connectDB();


// // ============================================================
// // MIDDLEWARE
// // ============================================================

// app.use(cors());

// app.use(express.json());


// // ============================================================
// // ROUTES
// // ============================================================

// app.use('/api/students', studentRoutes);

// app.use('/api/courses', courseRoutes);


// // ============================================================
// // TEST ROUTE
// // ============================================================

// app.get('/', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Niestali Orthodox Registration Server is running'
//   });
// });


// // ============================================================
// // SERVER
// // ============================================================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();


// ============================================================
// DATABASE
// ============================================================

connectDB();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json());


// ============================================================
// ROUTES
// ============================================================

app.use('/api/students', studentRoutes);

app.use('/api/courses', courseRoutes);

app.use('/api/admin', adminRoutes);


// ============================================================
// TEST ROUTE
// ============================================================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Niestali Orthodox Registration Server is running'
  });
});


// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});