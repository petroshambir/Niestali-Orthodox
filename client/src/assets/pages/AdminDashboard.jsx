
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://niestali-orthodox.onrender.com';

function AdminDashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [statistics, setStatistics] = useState({
    totalStudents: 0,
    totalCourses: 0
  });

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    duration: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const adminToken = localStorage.getItem('adminToken');


  // ============================================================
  // AUTH CHECK
  // ============================================================

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }

    loadDashboard();
  }, []);


  // ============================================================
  // AUTH HEADERS
  // ============================================================

  const getHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    };
  };


  // ============================================================
  // LOAD DASHBOARD
  // ============================================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      const [
        studentsResponse,
        coursesResponse,
        statisticsResponse
      ] = await Promise.all([
        fetch(
          `${API_URL}/api/admin/students`,
          {
            headers: getHeaders()
          }
        ),

        fetch(
          `${API_URL}/api/admin/courses`,
          {
            headers: getHeaders()
          }
        ),

        fetch(
          `${API_URL}/api/admin/statistics`,
          {
            headers: getHeaders()
          }
        )
      ]);

      if (
        studentsResponse.status === 401 ||
        coursesResponse.status === 401 ||
        statisticsResponse.status === 401
      ) {
        logout();
        return;
      }

      const studentsData =
        await studentsResponse.json();

      const coursesData =
        await coursesResponse.json();

      const statisticsData =
        await statisticsResponse.json();

      if (!studentsData.success) {
        throw new Error(
          studentsData.message ||
          'Could not load students'
        );
      }

      if (!coursesData.success) {
        throw new Error(
          coursesData.message ||
          'Could not load courses'
        );
      }

      if (!statisticsData.success) {
        throw new Error(
          statisticsData.message ||
          'Could not load statistics'
        );
      }

      setStudents(
        studentsData.students || []
      );

      setCourses(
        coursesData.courses || []
      );

      setStatistics(
        statisticsData.statistics || {
          totalStudents: 0,
          totalCourses: 0
        }
      );

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        'Failed to load dashboard'
      );

    } finally {
      setLoading(false);
    }
  };


  // ============================================================
  // LOGOUT
  // ============================================================

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');

    navigate('/admin-login');
  };


  // ============================================================
  // DELETE STUDENT
  // ============================================================

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/students/${id}`,
        {
          method: 'DELETE',
          headers: getHeaders()
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          'Failed to delete student'
        );
      }

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => student._id !== id
        )
      );

      setStatistics((current) => ({
        ...current,
        totalStudents:
          Math.max(
            0,
            current.totalStudents - 1
          )
      }));

      setSelectedStudent(null);

      alert('Student deleted successfully.');

    } catch (error) {
      alert(error.message);
    }
  };


  // ============================================================
  // COURSE FORM CHANGE
  // ============================================================

  const handleCourseChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    });
  };


  // ============================================================
  // OPEN ADD COURSE
  // ============================================================

  const openAddCourse = () => {
    setEditingCourse(null);

    setCourseForm({
      name: '',
      description: '',
      duration: ''
    });

    setShowCourseForm(true);
  };


  // ============================================================
  // OPEN EDIT COURSE
  // ============================================================

  const openEditCourse = (course) => {
    setEditingCourse(course);

    setCourseForm({
      name: course.name || '',
      description: course.description || '',
      duration: course.duration || ''
    });

    setShowCourseForm(true);
  };


  // ============================================================
  // CLOSE COURSE FORM
  // ============================================================

  const closeCourseForm = () => {
    setShowCourseForm(false);
    setEditingCourse(null);

    setCourseForm({
      name: '',
      description: '',
      duration: ''
    });
  };


  // ============================================================
  // SAVE COURSE
  // ============================================================

  const saveCourse = async (e) => {
    e.preventDefault();

    try {
      const url = editingCourse
        ? `${API_URL}/api/admin/courses/${editingCourse._id}`
        : `${API_URL}/api/admin/courses`;

      const method = editingCourse
        ? 'PUT'
        : 'POST';

      const response = await fetch(
        url,
        {
          method,
          headers: getHeaders(),
          body: JSON.stringify(courseForm)
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          'Failed to save course'
        );
      }

      if (editingCourse) {
        setCourses((currentCourses) =>
          currentCourses.map((course) =>
            course._id === editingCourse._id
              ? data.course
              : course
          )
        );
      } else {
        setCourses((currentCourses) => [
          data.course,
          ...currentCourses
        ]);

        setStatistics((current) => ({
          ...current,
          totalCourses:
            current.totalCourses + 1
        }));
      }

      closeCourseForm();

      alert(
        editingCourse
          ? 'Course updated successfully.'
          : 'Course added successfully.'
      );

    } catch (error) {
      alert(error.message);
    }
  };


  // ============================================================
  // DELETE COURSE
  // ============================================================

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/admin/courses/${id}`,
        {
          method: 'DELETE',
          headers: getHeaders()
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          'Failed to delete course'
        );
      }

      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) => course._id !== id
        )
      );

      setStatistics((current) => ({
        ...current,
        totalCourses:
          Math.max(
            0,
            current.totalCourses - 1
          )
      }));

      alert('Course deleted successfully.');

    } catch (error) {
      alert(error.message);
    }
  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-slate-600">
            Loading admin dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-700"
          >
            Niestali Orthodox
          </Link>

          <div className="flex items-center gap-4">

            <span className="hidden md:block text-sm text-slate-500">
              Administrator
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* PAGE TITLE */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="text-slate-600 mt-2">
            Manage students, courses and registration information.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-8">
            {error}
          </div>
        )}


        {/* ====================================================
            STATISTICS
        ==================================================== */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Students
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-2">
                  {statistics.totalStudents}
                </p>

              </div>

              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                👨‍🎓
              </div>

            </div>

          </div>


          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Courses
                </p>

                <p className="text-4xl font-bold text-slate-900 mt-2">
                  {statistics.totalCourses}
                </p>

              </div>

              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                🎓
              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            STUDENTS
        ==================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-10">

          <div className="p-6 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Registered Students
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                View and manage registered students.
              </p>

            </div>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {students.length}
            </span>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Name
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Course
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No registered students found.
                    </td>

                  </tr>

                ) : (

                  students.map((student) => (

                    <tr
                      key={student._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <p className="font-semibold text-slate-900">
                          {student.firstName}{' '}
                          {student.fatherName}{' '}
                          {student.lastName}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {student.phone}
                      </td>

                      <td className="px-6 py-4">

                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {student.course}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              setSelectedStudent(student)
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              deleteStudent(student._id)
                            }
                            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>


        {/* ====================================================
            COURSES
        ==================================================== */}

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-200 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Courses
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Add, edit and delete available courses.
              </p>

            </div>

            <button
              onClick={openAddCourse}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              + Add Course
            </button>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

            {courses.length === 0 ? (

              <div className="md:col-span-2 lg:col-span-3 text-center py-10 text-slate-500">
                No courses found.
              </div>

            ) : (

              courses.map((course) => (

                <div
                  key={course._id}
                  className="border border-slate-200 rounded-xl p-6"
                >

                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                    🎓
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {course.name}
                  </h3>

                  <p className="text-slate-600 mt-2 leading-6">
                    {course.description}
                  </p>

                  <p className="text-sm text-slate-500 mt-4">
                    Duration: {course.duration}
                  </p>

                  <div className="flex gap-2 mt-5">

                    <button
                      onClick={() =>
                        openEditCourse(course)
                      }
                      className="flex-1 bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCourse(course._id)
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>


      {/* ======================================================
          STUDENT DETAILS MODAL
      ====================================================== */}

      {selectedStudent && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">

          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-slate-900">
                Student Details
              </h2>

              <button
                onClick={() =>
                  setSelectedStudent(null)
                }
                className="text-slate-500 hover:text-slate-900 text-2xl"
              >
                ×
              </button>

            </div>


            <div className="p-6 grid md:grid-cols-2 gap-4">

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  First Name
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.firstName}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Father's Name
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.fatherName}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Last Name
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.lastName}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Age
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.age}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Country
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.country}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500">
                  Phone
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.phone}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl md:col-span-2">
                <p className="text-sm text-slate-500">
                  Email
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.email}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl md:col-span-2">
                <p className="text-sm text-slate-500">
                  Course
                </p>
                <p className="font-semibold mt-1">
                  {selectedStudent.course}
                </p>
              </div>

            </div>


            <div className="p-6 border-t border-slate-200">

              <button
                onClick={() =>
                  setSelectedStudent(null)
                }
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          COURSE FORM MODAL
      ====================================================== */}

      {showCourseForm && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">

          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-slate-900">

                {editingCourse
                  ? 'Edit Course'
                  : 'Add Course'}

              </h2>

              <button
                onClick={closeCourseForm}
                className="text-slate-500 hover:text-slate-900 text-2xl"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={saveCourse}
              className="p-6 space-y-5"
            >

              <div>

                <label className="block text-sm font-medium mb-2">
                  Course Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={courseForm.name}
                  onChange={handleCourseChange}
                  required
                  placeholder="Enter course name"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <div>

                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={courseForm.description}
                  onChange={handleCourseChange}
                  required
                  rows="4"
                  placeholder="Enter course description"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

              </div>


              <div>

                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={courseForm.duration}
                  onChange={handleCourseChange}
                  required
                  placeholder="Example: 6 Months"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeCourseForm}
                  className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {editingCourse
                    ? 'Update Course'
                    : 'Add Course'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;

