const Course = require('../models/Course');


// ============================================================
// GET ALL COURSES
// ============================================================

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      courses
    });

  } catch (error) {
    console.error('Get courses error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while getting courses'
    });
  }
};


// ============================================================
// GET SINGLE COURSE
// ============================================================

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });

  } catch (error) {
    console.error('Get course error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while getting course'
    });
  }
};


module.exports = {
  getCourses,
  getCourseById
};