const express = require('express');

const {
  loginAdmin,
  getStudents,
  getStudentById,
  deleteStudent,
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getStatistics
} = require('../controllers/adminController');

const adminAuth = require('../middleware/adminAuth');

const router = express.Router();


// ============================================================
// ADMIN LOGIN
// ============================================================

router.post('/login', loginAdmin);


// ============================================================
// ADMIN STATISTICS
// ============================================================

router.get(
  '/statistics',
  adminAuth,
  getStatistics
);


// ============================================================
// STUDENTS
// ============================================================

router.get(
  '/students',
  adminAuth,
  getStudents
);

router.get(
  '/students/:id',
  adminAuth,
  getStudentById
);

router.delete(
  '/students/:id',
  adminAuth,
  deleteStudent
);


// ============================================================
// COURSES
// ============================================================

router.get(
  '/courses',
  adminAuth,
  getAdminCourses
);

router.post(
  '/courses',
  adminAuth,
  createCourse
);

router.put(
  '/courses/:id',
  adminAuth,
  updateCourse
);

router.delete(
  '/courses/:id',
  adminAuth,
  deleteCourse
);


module.exports = router;