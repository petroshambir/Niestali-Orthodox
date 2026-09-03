
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:5000';

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `${API_URL}/api/admin/login`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email,
//             password
//           })
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(
//           data.message || 'Admin login failed'
//         );
//       }

//       localStorage.setItem(
//         'adminToken',
//         data.token
//       );

//       localStorage.setItem(
//         'adminData',
//         JSON.stringify(data.admin)
//       );

//       navigate('/admin-dashboard');

//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="max-w-md mx-auto px-6 py-20">

//       <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">

//         <div className="text-center mb-8">

//           <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
//             🔐
//           </div>

//           <h1 className="text-3xl font-bold text-slate-900">
//             Admin Login
//           </h1>

//           <p className="text-slate-600 mt-2">
//             Login to your administrator account.
//           </p>

//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div>

//             <label className="block text-sm font-medium mb-2">
//               Admin Email
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               required
//               autoComplete="email"
//               placeholder="Enter admin email"
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
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//               required
//               autoComplete="current-password"
//               placeholder="Enter admin password"
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
//           >
//             {loading ? 'Logging in...' : 'Login as Admin'}
//           </button>

//         </form>

//         <div className="text-center mt-6">

//           <Link
//             to="/"
//             className="text-blue-600 font-semibold"
//           >
//             ← Back to Website
//           </Link>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default AdminLogin;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import API_URL from "../components/api";
const API_URL = 'https://niestali-orthodox.onrender.com';

function AdminLogin() {
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
        `${API_URL}/api/admin/login`,
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
          data.message || 'Admin login failed'
        );
      }

      localStorage.setItem(
        'adminToken',
        data.token
      );

      localStorage.setItem(
        'adminData',
        JSON.stringify(data.admin)
      );

      navigate('/admin-dashboard');

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-20">

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="text-slate-600 mt-2">
            Login to your administrator account.
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
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="email"
              placeholder="Enter admin email"
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
              placeholder="Enter admin password"
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
              : 'Login as Admin'}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            ← Back to Website
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AdminLogin;