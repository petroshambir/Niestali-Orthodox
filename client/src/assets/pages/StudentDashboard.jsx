// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function StudentDashboard() {
//   const navigate = useNavigate();

//   const student = {
//     firstName: 'Petros',
//     fatherName: 'Hambir',
//     lastName: 'Student',
//     email: 'student@example.com',
//     course: 'Web Development'
//   };

//   const logout = () => {
//     navigate('/student-login');
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">

//       <div className="bg-white border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

//           <Link to="/" className="text-2xl font-bold text-blue-700">
//             StudentSystem
//           </Link>

//           <button
//             onClick={logout}
//             className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>

//         </div>
//       </div>

//       <main className="max-w-7xl mx-auto px-6 py-10">

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Welcome, {student.firstName}
//           </h1>

//           <p className="text-slate-600 mt-2">
//             Manage your student information and course.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           <Link
//             to="/student-dashboard/profile"
//             className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
//           >
//             <div className="text-3xl mb-4">👤</div>

//             <h2 className="text-xl font-bold text-slate-900">
//               My Information
//             </h2>

//             <p className="text-slate-600 mt-2">
//               View your personal student information.
//             </p>
//           </Link>

//           <Link
//             to="/student-dashboard/course"
//             className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
//           >
//             <div className="text-3xl mb-4">🎓</div>

//             <h2 className="text-xl font-bold text-slate-900">
//               My Course
//             </h2>

//             <p className="text-slate-600 mt-2">
//               View your registered course information.
//             </p>
//           </Link>

//         </div>

//       </main>
//     </div>
//   );
// }

// export default StudentDashboard;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API_URL from '../components/api';

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadStudent();
  }, []);

  const logout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentData');

    navigate('/student-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl mb-4">
            ⏳
          </div>

          <p className="text-slate-600">
            Loading your dashboard...
          </p>

        </div>

      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-700"
          >
            StudentSystem
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {student.firstName}
          </h1>

          <p className="text-slate-600 mt-2">
            Manage your student information and course.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            to="/student-dashboard/profile"
            className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              👤
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              My Information
            </h2>

            <p className="text-slate-600 mt-2">
              View your personal student information.
            </p>
          </Link>

          <Link
            to="/student-dashboard/course"
            className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">
              🎓
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              My Course
            </h2>

            <p className="text-slate-600 mt-2">
              View your registered course information.
            </p>
          </Link>

        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;