// const express = require('express');

// const {
//   registerStudent,
//   loginStudent
// } = require('../controllers/studentController');

// const router = express.Router();


// // ============================================================
// // STUDENT REGISTER
// // ============================================================

// router.post('/register', registerStudent);


// // ============================================================
// // STUDENT LOGIN
// // ============================================================

// router.post('/login', loginStudent);


// module.exports = router;

const express = require('express');

const {
  registerStudent,
  loginStudent,
  getCurrentStudent
} = require('../controllers/studentController');

const studentAuth = require('../middleware/studentAuth');

const router = express.Router();

router.post('/register', registerStudent);

router.post('/login', loginStudent);

router.get(
  '/me',
  studentAuth,
  getCurrentStudent
);

module.exports = router;