// import React from 'react';
// import { Link } from 'react-router-dom';

// const courses = [
//   {
//     id: 1,
//     title: 'Web Development',
//     description: 'Learn how to build modern websites and web applications.',
//     duration: '6 Months',
//     instructor: 'John Smith'
//   },
//   {
//     id: 2,
//     title: 'Graphic Design',
//     description: 'Learn design principles, graphics and creative tools.',
//     duration: '4 Months',
//     instructor: 'Sarah Johnson'
//   },
//   {
//     id: 3,
//     title: 'Digital Marketing',
//     description: 'Learn social media, marketing strategies and online business.',
//     duration: '3 Months',
//     instructor: 'Michael Brown'
//   }
// ];

// function Courses() {
//   return (
//     <section className="max-w-7xl mx-auto px-6 py-16">

//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-slate-900">
//           Our Courses
//         </h1>

//         <p className="text-slate-600 mt-3">
//           Choose the course that is right for you.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7"
//           >
//             <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-5">
//               🎓
//             </div>

//             <h2 className="text-xl font-bold text-slate-900 mb-3">
//               {course.title}
//             </h2>

//             <p className="text-slate-600 leading-7 mb-5">
//               {course.description}
//             </p>

//             <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
//               <span>{course.duration}</span>
//               <span>{course.instructor}</span>
//             </div>

//             <Link
//               to={`/courses/${course.id}`}
//               className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }

// export default Courses;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import API_URL from '../components/api';

function Courses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_URL}/api/courses`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
            'Could not load courses'
          );
        }

        setCourses(data.courses || []);

      } catch (error) {
        console.error(error);

        setError(
          error.message ||
          'Could not load courses'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">
          Our Courses
        </h1>

        <p className="text-slate-600 mt-3">
          Choose the course that is right for you.
        </p>
      </div>

      {loading && (
        <div className="text-center py-10">
          <p className="text-slate-600">
            Loading courses...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.length === 0 ? (

            <div className="md:col-span-2 lg:col-span-3 text-center py-10 text-slate-500">
              No courses found.
            </div>

          ) : (

            courses.map((course) => (

              <div
                key={course._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7"
              >

                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-5">
                  🎓
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {course.name}
                </h2>

                <p className="text-slate-600 leading-7 mb-5">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <span>{course.duration}</span>

                  <span>
                    {course.instructor ||
                      'Not specified'}
                  </span>
                </div>

                <Link
                  to={`/courses/${course._id}`}
                  className="block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>

              </div>

            ))

          )}

        </div>
      )}

    </section>
  );
}

export default Courses;