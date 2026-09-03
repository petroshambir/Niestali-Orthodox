// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Navbar from './assets/components/Navbar';
// import Footer from './assets/components/Footer';

// import Home from './assets/pages/Home';
// import About from './assets/pages/About';
// import Courses from './assets/pages/Courses';
// import CourseDetails from './assets/pages/CourseDetails';
// import Register from './assets/pages/Register';
// import StudentLogin from './assets/pages/StudentLogin';

// import StudentDashboard from './assets/pages/StudentDashboard';
// import StudentProfile from './assets/pages/StudentProfile';
// import StudentCourse from './assets/pages/StudentCourse';

// function PublicLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />

//       <main className="min-h-[calc(100vh-140px)]">
//         {children}
//       </main>

//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>

//       {/* Public Pages */}
//       <Route
//         path="/"
//         element={
//           <PublicLayout>
//             <Home />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/about"
//         element={
//           <PublicLayout>
//             <About />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/courses"
//         element={
//           <PublicLayout>
//             <Courses />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/courses/:id"
//         element={
//           <PublicLayout>
//             <CourseDetails />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/register"
//         element={
//           <PublicLayout>
//             <Register />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/student-login"
//         element={
//           <PublicLayout>
//             <StudentLogin />
//           </PublicLayout>
//         }
//       />

//       {/* Student Dashboard */}
//       <Route
//         path="/student-dashboard"
//         element={<StudentDashboard />}
//       />

//       <Route
//         path="/student-dashboard/profile"
//         element={<StudentProfile />}
//       />

//       <Route
//         path="/student-dashboard/course"
//         element={<StudentCourse />}
//       />

//       {/* Unknown URL */}
//       <Route
//         path="*"
//         element={<Navigate to="/" replace />}
//       />

//     </Routes>
//   );
// }

// export default App;

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import Home from './pages/Home';
// import About from './pages/About';
// import Courses from './pages/Courses';
// import CourseDetails from './pages/CourseDetails';
// import Register from './pages/Register';
// import StudentLogin from './pages/StudentLogin';

// import StudentDashboard from './pages/StudentDashboard';
// import StudentProfile from './pages/StudentProfile';
// import StudentCourse from './pages/StudentCourse';

// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';


// function PublicLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-slate-50">

//       <Navbar />

//       <main className="min-h-[calc(100vh-140px)]">
//         {children}
//       </main>

//       <Footer />

//     </div>
//   );
// }


// function App() {
//   return (
//     <Routes>

//       {/* ======================================================
//           PUBLIC PAGES
//       ====================================================== */}

//       <Route
//         path="/"
//         element={
//           <PublicLayout>
//             <Home />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/about"
//         element={
//           <PublicLayout>
//             <About />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/courses"
//         element={
//           <PublicLayout>
//             <Courses />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/courses/:id"
//         element={
//           <PublicLayout>
//             <CourseDetails />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/register"
//         element={
//           <PublicLayout>
//             <Register />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/student-login"
//         element={
//           <PublicLayout>
//             <StudentLogin />
//           </PublicLayout>
//         }
//       />


//       {/* ======================================================
//           STUDENT DASHBOARD
//       ====================================================== */}

//       <Route
//         path="/student-dashboard"
//         element={<StudentDashboard />}
//       />

//       <Route
//         path="/student-dashboard/profile"
//         element={<StudentProfile />}
//       />

//       <Route
//         path="/student-dashboard/course"
//         element={<StudentCourse />}
//       />


//       {/* ======================================================
//           ADMIN
//       ====================================================== */}

//       <Route
//         path="/admin-login"
//         element={
//           <PublicLayout>
//             <AdminLogin />
//           </PublicLayout>
//         }
//       />

//       <Route
//         path="/admin-dashboard"
//         element={<AdminDashboard />}
//       />


//       {/* ======================================================
//           NOT FOUND
//       ====================================================== */}

//       <Route
//         path="*"
//         element={<Navigate to="/" replace />}
//       />

//     </Routes>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

import Home from './assets/pages/Home';
import About from './assets/pages/About';
import Courses from './assets/pages/Courses';
import CourseDetails from './assets/pages/CourseDetails';
import Register from './assets/pages/Register';
import StudentLogin from './assets/pages/StudentLogin';

import StudentDashboard from './assets/pages/StudentDashboard';
import StudentProfile from './assets/pages/StudentProfile';
import StudentCourse from './assets/pages/StudentCourse';

import AdminLogin from './assets/pages/AdminLogin';
import AdminDashboard from './assets/pages/AdminDashboard';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="min-h-[calc(100vh-140px)]">
        {children}
      </main>

      <Footer />

    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <PublicLayout>
            <Courses />
          </PublicLayout>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <PublicLayout>
            <CourseDetails />
          </PublicLayout>
        }
      />

      <Route
        path="/register"
        element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        }
      />

      <Route
        path="/student-login"
        element={
          <PublicLayout>
            <StudentLogin />
          </PublicLayout>
        }
      />

      <Route
        path="/student-dashboard"
        element={<StudentDashboard />}
      />

      <Route
        path="/student-dashboard/profile"
        element={<StudentProfile />}
      />

      <Route
        path="/student-dashboard/course"
        element={<StudentCourse />}
      />

      <Route
        path="/admin-login"
        element={
          <PublicLayout>
            <AdminLogin />
          </PublicLayout>
        }
      />

      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;