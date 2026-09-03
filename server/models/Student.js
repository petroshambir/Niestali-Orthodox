const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    fatherName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true
    },

    country: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;