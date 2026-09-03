// import React from 'react';
// import { Link, useParams } from 'react-router-dom';

// const courses = {
//   1: {
//     title: 'Web Development',
//     description: 'Learn how to build modern websites and web applications.',
//     duration: '6 Months',
//     instructor: 'John Smith'
//   },
//   2: {
//     title: 'Graphic Design',
//     description: 'Learn design principles, graphics and creative tools.',
//     duration: '4 Months',
//     instructor: 'Sarah Johnson'
//   },
//   3: {
//     title: 'Digital Marketing',
//     description: 'Learn social media, marketing strategies and online business.',
//     duration: '3 Months',
//     instructor: 'Michael Brown'
//   }
// };

// function CourseDetails() {
//   const { id } = useParams();
//   const course = courses[id];

//   if (!course) {
//     return (
//       <div className="max-w-4xl mx-auto px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-slate-900 mb-4">
//           Course Not Found
//         </h1>

//         <Link
//           to="/courses"
//           className="text-blue-600 font-semibold"
//         >
//           Back to Courses
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-4xl mx-auto px-6 py-16">

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">

//         <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">
//           🎓
//         </div>

//         <h1 className="text-4xl font-bold text-slate-900 mb-5">
//           {course.title}
//         </h1>

//         <p className="text-slate-600 text-lg leading-8 mb-8">
//           {course.description}
//         </p>

//         <div className="grid sm:grid-cols-2 gap-4 mb-8">

//           <div className="bg-slate-50 rounded-xl p-5">
//             <p className="text-sm text-slate-500">Duration</p>
//             <p className="font-semibold text-slate-900 mt-1">
//               {course.duration}
//             </p>
//           </div>

//           <div className="bg-slate-50 rounded-xl p-5">
//             <p className="text-sm text-slate-500">Instructor</p>
//             <p className="font-semibold text-slate-900 mt-1">
//               {course.instructor}
//             </p>
//           </div>

//         </div>

//         <Link
//           to="/register"
//           className="inline-block bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
//         >
//           Register for This Course
//         </Link>

//       </div>

//     </section>
//   );
// }

// export default CourseDetails;

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import API_URL from '../components/api';

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_URL}/api/courses/${id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
            'Course not found'
          );
        }

        setCourse(data.course);

      } catch (error) {
        console.error(error);

        setError(
          error.message ||
          'Could not load course'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-slate-600">
          Loading course...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Course Not Found
        </h1>

        <Link
          to="/courses"
          className="text-blue-600 font-semibold"
        >
          Back to Courses
        </Link>

      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">

        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-6">
          🎓
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-5">
          {course.name}
        </h1>

        <p className="text-slate-600 text-lg leading-8 mb-8">
          {course.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Duration
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {course.duration}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Instructor
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {course.instructor ||
                'Not specified'}
            </p>
          </div>

        </div>

        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Register for This Course
        </Link>

      </div>

    </section>
  );
}

export default CourseDetails;