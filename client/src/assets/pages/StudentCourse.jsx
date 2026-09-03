

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API_URL from '../components/api';

function StudentCourse() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      const token =
        localStorage.getItem('studentToken');

      if (!token) {
        navigate('/student-login');
        return;
      }

      try {
        const studentResponse = await fetch(
          `${API_URL}/api/students/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const studentData =
          await studentResponse.json();

        if (
          studentResponse.status === 401 ||
          !studentResponse.ok ||
          !studentData.success
        ) {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentData');

          navigate('/student-login');
          return;
        }

        setStudent(studentData.student);

        const coursesResponse = await fetch(
          `${API_URL}/api/courses`
        );

        const coursesData =
          await coursesResponse.json();

        if (
          !coursesResponse.ok ||
          !coursesData.success
        ) {
          throw new Error(
            coursesData.message ||
            'Could not load courses'
          );
        }

        const registeredCourse =
          coursesData.courses.find(
            (item) =>
              item.name ===
              studentData.student.course
          );

        setCourse(registeredCourse || null);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">
          Loading your course...
        </p>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const courseTitle =
    course?.name || student.course;

  const courseDuration =
    course?.duration || 'Not available';

  const instructor =
    course?.instructor || 'Not specified';

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-4xl mx-auto px-6 py-12">

        <Link
          to="/student-dashboard"
          className="text-blue-600 font-semibold"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-6">

          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">
            🎓
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            My Course
          </h1>

          {!course && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-5 py-4 rounded-xl mb-6">
              Your registered course was not found in the available courses.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Course
              </p>

              <p className="font-semibold mt-1">
                {courseTitle}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Duration
              </p>

              <p className="font-semibold mt-1">
                {courseDuration}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Instructor
              </p>

              <p className="font-semibold mt-1">
                {instructor}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="font-semibold text-green-600 mt-1">
                Registered
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentCourse;