
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');
const Course = require('../models/Course');


// ============================================================
// ADMIN LOGIN
// ============================================================

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ----------------------------------------------------------
    // Check login fields
    // ----------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // ----------------------------------------------------------
    // Get admin configuration from environment variables
    // ----------------------------------------------------------

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    // ----------------------------------------------------------
    // Check environment variables
    // ----------------------------------------------------------

    if (!adminEmail) {
      console.error('ADMIN_EMAIL is missing from server environment variables');

      return res.status(500).json({
        success: false,
        message: 'Admin email is not configured on the server'
      });
    }

    if (!adminPasswordHash) {
      console.error(
        'ADMIN_PASSWORD_HASH is missing from server environment variables'
      );

      return res.status(500).json({
        success: false,
        message: 'Admin password is not configured on the server'
      });
    }

    if (!jwtSecret) {
      console.error(
        'JWT_SECRET is missing from server environment variables'
      );

      return res.status(500).json({
        success: false,
        message: 'JWT secret is not configured on the server'
      });
    }

    // ----------------------------------------------------------
    // Check admin email
    // ----------------------------------------------------------

    const enteredEmail = String(email).trim().toLowerCase();
    const savedAdminEmail = String(adminEmail).trim().toLowerCase();

    if (enteredEmail !== savedAdminEmail) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin email or password'
      });
    }

    // ----------------------------------------------------------
    // Check admin password
    // ----------------------------------------------------------

    // const passwordMatch = await bcrypt.compare(
    //   password,
    //   adminPasswordHash
    // );

    // if (!passwordMatch) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid admin email or password'
    //   });
    // }
// ----------------------------------------------------------
    // Check admin password (supports both plain text and bcrypt hash)
    // ----------------------------------------------------------

    let passwordMatch = false;

    if (
      adminPasswordHash.startsWith('$2b$') ||
      adminPasswordHash.startsWith('$2a$') ||
      adminPasswordHash.startsWith('$2y$')
    ) {
      passwordMatch = await bcrypt.compare(password, adminPasswordHash);
    } else {
      passwordMatch = (password === adminPasswordHash);
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin email or password'
      });
    }
    // ----------------------------------------------------------
    // Create admin JWT token
    // ----------------------------------------------------------

    const token = jwt.sign(
      {
        role: 'admin',
        email: adminEmail
      },
      jwtSecret,
      {
        expiresIn: '7d'
      }
    );

    // ----------------------------------------------------------
    // Successful login
    // ----------------------------------------------------------

    return res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        email: adminEmail
      }
    });

  } catch (error) {
    console.error(
      'Admin login error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error during admin login'
    });
  }
};


// ============================================================
// GET ALL STUDENTS
// ============================================================

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select('-password')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      students
    });

  } catch (error) {
    console.error(
      'Get students error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while getting students'
    });
  }
};


// ============================================================
// GET SINGLE STUDENT
// ============================================================

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    return res.json({
      success: true,
      student
    });

  } catch (error) {
    console.error(
      'Get student error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while getting student'
    });
  }
};


// ============================================================
// DELETE STUDENT
// ============================================================

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error(
      'Delete student error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting student'
    });
  }
};


// ============================================================
// GET ALL COURSES FOR ADMIN
// ============================================================

const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      courses
    });

  } catch (error) {
    console.error(
      'Admin get courses error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while getting courses'
    });
  }
};


// ============================================================
// ADD COURSE
// ============================================================

const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      duration
    } = req.body;

    if (!name || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all course fields'
      });
    }

    const course = await Course.create({
      name: name.trim(),
      description: description.trim(),
      duration: duration.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });

  } catch (error) {
    console.error(
      'Create course error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
};


// ============================================================
// UPDATE COURSE
// ============================================================

const updateCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      duration
    } = req.body;

    if (!name || !description || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all course fields'
      });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description.trim(),
        duration: duration.trim()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    return res.json({
      success: true,
      message: 'Course updated successfully',
      course
    });

  } catch (error) {
    console.error(
      'Update course error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
};


// ============================================================
// DELETE COURSE
// ============================================================

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error(
      'Delete course error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
};


// ============================================================
// ADMIN STATISTICS
// ============================================================

const getStatistics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();

    return res.json({
      success: true,
      statistics: {
        totalStudents,
        totalCourses
      }
    });

  } catch (error) {
    console.error(
      'Statistics error:',
      error.message
    );

    return res.status(500).json({
      success: false,
      message: 'Server error while getting statistics'
    });
  }
};


// ============================================================
// EXPORT CONTROLLERS
// ============================================================

module.exports = {
  loginAdmin,
  getStudents,
  getStudentById,
  deleteStudent,
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getStatistics
};

