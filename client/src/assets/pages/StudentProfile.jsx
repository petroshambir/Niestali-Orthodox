

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API_URL from '../components/api';

function StudentProfile() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      const token =
        localStorage.getItem('studentToken');

      if (!token) {
        navigate('/student-login');
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/students/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (
          response.status === 401 ||
          !response.ok ||
          !data.success
        ) {
          localStorage.removeItem('studentToken');
          localStorage.removeItem('studentData');

          navigate('/student-login');
          return;
        }

        setStudent(data.student);

        localStorage.setItem(
          'studentData',
          JSON.stringify(data.student)
        );

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">
          Loading your information...
        </p>
      </div>
    );
  }

  if (!student) {
    return null;
  }

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

          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            My Information
          </h1>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                First Name
              </p>
              <p className="font-semibold mt-1">
                {student.firstName}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Father's Name
              </p>
              <p className="font-semibold mt-1">
                {student.fatherName}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Last Name
              </p>
              <p className="font-semibold mt-1">
                {student.lastName}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Age
              </p>
              <p className="font-semibold mt-1">
                {student.age}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Country
              </p>
              <p className="font-semibold mt-1">
                {student.country}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl">
              <p className="text-sm text-slate-500">
                Phone
              </p>
              <p className="font-semibold mt-1">
                {student.phone}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl md:col-span-2">
              <p className="text-sm text-slate-500">
                Email
              </p>
              <p className="font-semibold mt-1">
                {student.email}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;