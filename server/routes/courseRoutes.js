const express = require('express');

const {
  getCourses,
  getCourseById
} = require('../controllers/courseController');

const router = express.Router();


// ============================================================
// GET ALL COURSES
// ============================================================

router.get('/', getCourses);


// ============================================================
// GET COURSE BY ID
// ============================================================

router.get('/:id', getCourseById);


module.exports = router;