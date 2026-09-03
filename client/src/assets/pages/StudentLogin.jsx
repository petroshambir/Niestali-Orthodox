// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function StudentLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log({ email, password });

//     navigate('/student-dashboard');
//   };

//   return (
//     <section className="max-w-md mx-auto px-6 py-20">

//       <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Student Login
//           </h1>

//           <p className="text-slate-600 mt-2">
//             Login to your student account.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center text-sm text-slate-600 mt-6">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-blue-600 font-semibold">
//             Register
//           </Link>
//         </p>

//       </div>

//     </section>
//   );
// }

// export default StudentLogin;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API_URL from '../components/api';

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/students/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Login failed'
        );
      }

      localStorage.setItem(
        'studentToken',
        data.token
      );

      localStorage.setItem(
        'studentData',
        JSON.stringify(data.student)
      );

      navigate('/student-dashboard');

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-20">

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Student Login
          </h1>

          <p className="text-slate-600 mt-2">
            Login to your student account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="current-password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </button>

        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{' '}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </section>
  );
}

export default StudentLogin;