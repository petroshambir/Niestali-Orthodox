// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div>

//       <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

//           <div className="max-w-3xl">

//             <p className="text-blue-200 font-semibold mb-4">
//               STUDENT REGISTRATION SYSTEM
//             </p>

//             <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
//               Start Your Learning Journey With Us
//             </h1>

//             <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
//               Register as a student, choose your course and manage
//               your student information from one simple platform.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 to="/register"
//                 className="bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
//               >
//                 Register Now
//               </Link>

//               <Link
//                 to="/courses"
//                 className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
//               >
//                 View Courses
//               </Link>
//             </div>

//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto px-6 py-16">

//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-slate-900">
//             Why Choose Us?
//           </h2>

//           <p className="text-slate-600 mt-3">
//             Everything you need for a simple student registration experience.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">

//           <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
//             <div className="text-3xl mb-4">🎓</div>
//             <h3 className="text-xl font-semibold mb-2">Quality Courses</h3>
//             <p className="text-slate-600">
//               Choose from our available courses and begin your studies.
//             </p>
//           </div>

//           <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
//             <div className="text-3xl mb-4">📝</div>
//             <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
//             <p className="text-slate-600">
//               Register quickly using our simple student registration form.
//             </p>
//           </div>

//           <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">
//             <div className="text-3xl mb-4">👨‍🎓</div>
//             <h3 className="text-xl font-semibold mb-2">Student Dashboard</h3>
//             <p className="text-slate-600">
//               View your information and registered course in one place.
//             </p>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

          <div className="max-w-3xl">

            <p className="text-blue-200 font-semibold mb-4">
              STUDENT REGISTRATION SYSTEM
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Start Your Learning Journey With Us
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
              Register as a student, choose your course and manage
              your student information from one simple platform.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/register"
                className="bg-white text-blue-700 px-7 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
              >
                Register Now
              </Link>

              <Link
                to="/courses"
                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                View Courses
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-slate-900">
            Why Choose Us?
          </h2>

          <p className="text-slate-600 mt-3">
            Everything you need for a simple student registration experience.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">

            <div className="text-3xl mb-4">
              🎓
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Quality Courses
            </h3>

            <p className="text-slate-600">
              Choose from our available courses and begin your studies.
            </p>

          </div>


          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">

            <div className="text-3xl mb-4">
              📝
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Easy Registration
            </h3>

            <p className="text-slate-600">
              Register quickly using our simple student registration form.
            </p>

          </div>


          <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200">

            <div className="text-3xl mb-4">
              👨‍🎓
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Student Dashboard
            </h3>

            <p className="text-slate-600">
              View your information and registered course in one place.
            </p>

          </div>

        </div>


        {/* ADMIN LOGIN */}
        <div className="flex justify-center mt-12">

          <Link
            to="/admin-login"
            className="text-sm text-slate-500 hover:text-blue-600 transition"
          >
            🔐 Admin Login
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;