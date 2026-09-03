// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const Student = require('../models/Student');


// // ============================================================
// // REGISTER STUDENT
// // ============================================================

// const registerStudent = async (req, res) => {
//   try {
//     const {
//       firstName,
//       fatherName,
//       lastName,
//       age,
//       country,
//       phone,
//       email,
//       password,
//       confirmPassword,
//       course
//     } = req.body;


//     // ----------------------------------------------------------
//     // CHECK REQUIRED FIELDS
//     // ----------------------------------------------------------

//     if (
//       !firstName ||
//       !fatherName ||
//       !lastName ||
//       !age ||
//       !country ||
//       !phone ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !course
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please fill in all fields'
//       });
//     }


//     // ----------------------------------------------------------
//     // CHECK PASSWORD
//     // ----------------------------------------------------------

//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Passwords do not match'
//       });
//     }


//     // ----------------------------------------------------------
//     // CHECK EXISTING STUDENT
//     // ----------------------------------------------------------

//     const existingStudent = await Student.findOne({ email });

//     if (existingStudent) {
//       return res.status(400).json({
//         success: false,
//         message: 'A student with this email already exists'
//       });
//     }


//     // ----------------------------------------------------------
//     // HASH PASSWORD
//     // ----------------------------------------------------------

//     const hashedPassword = await bcrypt.hash(password, 10);


//     // ----------------------------------------------------------
//     // CREATE STUDENT
//     // ----------------------------------------------------------

//     const student = await Student.create({
//       firstName,
//       fatherName,
//       lastName,
//       age,
//       country,
//       phone,
//       email,
//       password: hashedPassword,
//       course
//     });


//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     res.status(201).json({
//       success: true,
//       message: 'Student registered successfully',
//       student: {
//         id: student._id,
//         firstName: student.firstName,
//         fatherName: student.fatherName,
//         lastName: student.lastName,
//         age: student.age,
//         country: student.country,
//         phone: student.phone,
//         email: student.email,
//         course: student.course
//       }
//     });

//   } catch (error) {
//     console.error('Register error:', error);

//     res.status(500).json({
//       success: false,
//       message: 'Server error during registration'
//     });
//   }
// };


// // ============================================================
// // LOGIN STUDENT
// // ============================================================

// const loginStudent = async (req, res) => {
//   try {
//     const { email, password } = req.body;


//     // ----------------------------------------------------------
//     // CHECK FIELDS
//     // ----------------------------------------------------------

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       });
//     }


//     // ----------------------------------------------------------
//     // FIND STUDENT
//     // ----------------------------------------------------------

//     const student = await Student.findOne({ email });

//     if (!student) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }


//     // ----------------------------------------------------------
//     // CHECK PASSWORD
//     // ----------------------------------------------------------

//     const passwordMatch = await bcrypt.compare(
//       password,
//       student.password
//     );

//     if (!passwordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password'
//       });
//     }


//     // ----------------------------------------------------------
//     // CREATE JWT TOKEN
//     // ----------------------------------------------------------

//     const token = jwt.sign(
//       {
//         id: student._id
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: '7d'
//       }
//     );


//     // ----------------------------------------------------------
//     // RESPONSE
//     // ----------------------------------------------------------

//     res.json({
//       success: true,
//       message: 'Login successful',

//       token,

//       student: {
//         id: student._id,
//         firstName: student.firstName,
//         fatherName: student.fatherName,
//         lastName: student.lastName,
//         age: student.age,
//         country: student.country,
//         phone: student.phone,
//         email: student.email,
//         course: student.course
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);

//     res.status(500).json({
//       success: false,
//       message: 'Server error during login'
//     });
//   }
// };


// module.exports = {
//   registerStudent,
//   loginStudent
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      fatherName,
      lastName,
      age,
      country,
      phone,
      email,
      password,
      confirmPassword,
      course
    } = req.body;

    if (
      !firstName ||
      !fatherName ||
      !lastName ||
      !age ||
      !country ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !course
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    const existingStudent = await Student.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const student = await Student.create({
      firstName,
      fatherName,
      lastName,
      age,
      country,
      phone,
      email,
      password: hashedPassword,
      course
    });

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      student: {
        id: student._id,
        firstName: student.firstName,
        fatherName: student.fatherName,
        lastName: student.lastName,
        age: student.age,
        country: student.country,
        phone: student.phone,
        email: student.email,
        course: student.course
      }
    });

  } catch (error) {
    console.error('Register error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};


const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const student = await Student.findOne({
      email: email.toLowerCase().trim()
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      {
        id: student._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        firstName: student.firstName,
        fatherName: student.fatherName,
        lastName: student.lastName,
        age: student.age,
        country: student.country,
        phone: student.phone,
        email: student.email,
        course: student.course
      }
    });

  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};


const getCurrentStudent = async (req, res) => {
  try {
    const student = await Student.findById(
      req.studentId
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student
    });

  } catch (error) {
    console.error(
      'Get current student error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Server error while getting student'
    });
  }
};


module.exports = {
  registerStudent,
  loginStudent,
  getCurrentStudent
};