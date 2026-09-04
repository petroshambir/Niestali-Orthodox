


// import React, { useEffect, useState } from 'react';

// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// import API_URL from '../components/api';

// function Register() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     fatherName: '',
//     lastName: '',
//     age: '',
//     country: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     course: ''
//   });

//   const [courses, setCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // ------------------------------------------------------------
//   // LOAD COURSES
//   // ------------------------------------------------------------

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         setLoadingCourses(true);

//         const response = await fetch(
//           `${API_URL}/api/courses`
//         );

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(
//             data.message || 'Could not load courses'
//           );
//         }

//         setCourses(data.courses || []);
//       } catch (error) {
//         console.error(error);

//         setError(
//           error.message || 'Could not load courses'
//         );
//       } finally {
//         setLoadingCourses(false);
//       }
//     };

//     loadCourses();
//   }, []);

//   // ------------------------------------------------------------
//   // HANDLE INPUT
//   // ------------------------------------------------------------

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ------------------------------------------------------------
//   // HANDLE PHONE NUMBER
//   // ------------------------------------------------------------

// //   const handlePhoneChange = (value) => {
// //     setFormData({
// //       ...formData,
// //       phone: value || ''
// //     });
// //   };
// const handlePhoneChange = (value) => {
    
//     setFormData({
//       ...formData,
//       phone: value || '',
//       country: 'Auto-detected via Phone' // ወይ ድማ ካብቲ value ተበጊስካ ክትመልኦ ትኽእል
//     });
//   };
//   // ------------------------------------------------------------
//   // HANDLE COUNTRY
//   // ------------------------------------------------------------

//   const handleCountryChange = (country) => {
//     setFormData({
//       ...formData,
//       country: country || ''
//     });
//   };

//   // ------------------------------------------------------------
//   // HANDLE REGISTRATION
//   // ------------------------------------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError('');

//     if (
//       formData.password !==
//       formData.confirmPassword
//     ) {
//       alert('Passwords do not match.');
//       return;
//     }

//     if (!formData.country) {
//       alert('Please select your country.');
//       return;
//     }

//     // if (!formData.phone) {
//     //   alert('Please enter your phone number.');
//     //   return;
//     // }
// if (!formData.phone) {
//       alert('Please enter your phone number.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `${API_URL}/api/students/register`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(
//           data.message || 'Registration failed'
//         );
//       }

//       alert('Registration successful!');

//       setFormData({
//         firstName: '',
//         fatherName: '',
//         lastName: '',
//         age: '',
//         country: '',
//         phone: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         course: ''
//       });

//       setShowPassword(false);
//       setShowConfirmPassword(false);

//     } catch (error) {
//       console.error(error);

//       setError(
//         error.message ||
//         'Registration failed'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------------------------------------
//   // EYE ICON
//   // ------------------------------------------------------------

//   const EyeIcon = ({ visible }) => {
//     if (visible) {
//       return (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.8"
//           stroke="currentColor"
//           className="w-5 h-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//           />
//         </svg>
//       );
//     }

//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.8"
//         stroke="currentColor"
//         className="w-5 h-5"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3.98 8.223A10.477 10.477 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.55 0 3.04-.337 4.37-.94"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M6.228 6.228A10.45 10.45 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.48 10.48 0 0 1-2.137 3.568"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M6.228 6.228 3 3m3.228 3.228 3.51 3.51m5.532 5.532L21 21m-4.73-4.73-3.27-3.27m0 0a3 3 0 1 1-4.243-4.243"
//         />
//       </svg>
//     );
//   };

//   return (
//     <section className="min-h-screen bg-slate-50 px-4 sm:px-6 py-12 md:py-16">

//       <div className="max-w-5xl mx-auto">

//         {/* -------------------------------------------------- */}
//         {/* PAGE HEADER */}
//         {/* -------------------------------------------------- */}

//         <div className="text-center mb-10">

//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 mb-5">

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.8"
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.5-1.632Z"
//               />
//             </svg>

//           </div>

//           <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
//             Student Registration
//           </h1>

//           <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
//             Create your student account and register for
//             your preferred course.
//           </p>

//         </div>


//         {/* -------------------------------------------------- */}
//         {/* ERROR MESSAGE */}
//         {/* -------------------------------------------------- */}

//         {error && (
//           <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6 flex items-start gap-3">

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.8"
//               stroke="currentColor"
//               className="w-5 h-5 mt-0.5 shrink-0"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m0 3.75h.007v.008H12V16.5Zm9-4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>

//             <span>{error}</span>

//           </div>
//         )}


//         {/* -------------------------------------------------- */}
//         {/* REGISTRATION FORM */}
//         {/* -------------------------------------------------- */}

//         <form
//           onSubmit={handleSubmit}
//           className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
//         >

//           {/* FORM TITLE */}

//           <div className="px-6 md:px-10 py-6 border-b border-slate-200 bg-slate-50">

//             <h2 className="text-xl font-semibold text-slate-900">
//               Personal Information
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Please provide your information accurately.
//             </p>

//           </div>


//           <div className="p-6 md:p-10">

//             <div className="grid md:grid-cols-2 gap-6">


//               {/* FIRST NAME */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   First Name
//                 </label>

//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   autoComplete="given-name"
//                   placeholder="Enter your first name"
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />

//               </div>


//               {/* FATHER NAME */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Father's Name
//                 </label>

//                 <input
//                   type="text"
//                   name="fatherName"
//                   value={formData.fatherName}
//                   onChange={handleChange}
//                   required
//                   autoComplete="additional-name"
//                   placeholder="Enter your father's name"
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />

//               </div>


//               {/* LAST NAME */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Last Name
//                 </label>

//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   autoComplete="family-name"
//                   placeholder="Enter your last name"
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />

//               </div>


//               {/* AGE */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Age
//                 </label>

//                 <input
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                   min="1"
//                   max="120"
//                   placeholder="Enter your age"
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />

//               </div>


//               {/* COUNTRY + PHONE */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Country
//                 </label>

//                 <PhoneInput
//                   international
//                   countryCallingCodeEditable={false}
//                   value={formData.phone}
//                   onChange={handlePhoneChange}
//                   onCountryChange={handleCountryChange}
//                   placeholder="Enter your phone number"
//                   defaultCountry="NL"
//                   required
//                   className="phone-input-professional"
//                 />

//                 <p className="text-xs text-slate-500 mt-2">
//                   Select your country and enter your international phone number.
//                 </p>

//               </div>


//               {/* EMAIL */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   autoComplete="email"
//                   placeholder="Enter your email address"
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />

//               </div>


//               {/* COURSE */}

//               <div className="md:col-span-2">

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Select Course
//                 </label>

//                 <select
//                   name="course"
//                   value={formData.course}
//                   onChange={handleChange}
//                   required
//                   disabled={loadingCourses}
//                   className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
//                 >

//                   <option value="">
//                     {loadingCourses
//                       ? 'Loading available courses...'
//                       : 'Select your course'}
//                   </option>

//                   {courses.map((course) => (
//                     <option
//                       key={course._id}
//                       value={course.name}
//                     >
//                       {course.name}
//                     </option>
//                   ))}

//                 </select>

//               </div>


//               {/* PASSWORD */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Password
//                 </label>

//                 <div className="relative">

//                   <input
//                     type={
//                       showPassword
//                         ? 'text'
//                         : 'password'
//                     }
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     autoComplete="new-password"
//                     placeholder="Create a password"
//                     className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
//                     aria-label={
//                       showPassword
//                         ? 'Hide password'
//                         : 'Show password'
//                     }
//                   >
//                     <EyeIcon visible={showPassword} />
//                   </button>

//                 </div>

//                 <p className="text-xs text-slate-500 mt-2">
//                   Choose a secure password for your account.
//                 </p>

//               </div>


//               {/* CONFIRM PASSWORD */}

//               <div>

//                 <label className="block text-sm font-semibold text-slate-700 mb-2">
//                   Confirm Password
//                 </label>

//                 <div className="relative">

//                   <input
//                     type={
//                       showConfirmPassword
//                         ? 'text'
//                         : 'password'
//                     }
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     autoComplete="new-password"
//                     placeholder="Confirm your password"
//                     className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(
//                         !showConfirmPassword
//                       )
//                     }
//                     className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
//                     aria-label={
//                       showConfirmPassword
//                         ? 'Hide password'
//                         : 'Show password'
//                     }
//                   >
//                     <EyeIcon
//                       visible={
//                         showConfirmPassword
//                       }
//                     />
//                   </button>

//                 </div>

//               </div>

//             </div>


//             {/* ------------------------------------------------ */}
//             {/* SUBMIT */}
//             {/* ------------------------------------------------ */}

//             <div className="mt-8 pt-6 border-t border-slate-200">

//               <button
//                 type="submit"
//                 disabled={
//                   loading ||
//                   loadingCourses
//                 }
//                 className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading
//                   ? 'Registering Student...'
//                   : 'Complete Student Registration'}
//               </button>

//               <p className="text-center text-xs text-slate-500 mt-4">
//                 Please make sure all information is correct
//                 before submitting your registration.
//               </p>

//             </div>

//           </div>

//         </form>

//       </div>

//       {/* -------------------------------------------------- */}
//       {/* PHONE INPUT STYLING */}
//       {/* -------------------------------------------------- */}

//       <style>{`
//         .phone-input-professional {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           border: 1px solid #cbd5e1;
//           border-radius: 0.75rem;
//           background: #ffffff;
//           padding: 0.15rem 0.9rem;
//           min-height: 54px;
//           transition: all 0.2s ease;
//         }

//         .phone-input-professional:focus-within {
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
//         }

//         .phone-input-professional .PhoneInputCountry {
//           display: flex;
//           align-items: center;
//           margin-right: 0.75rem;
//         }

//         .phone-input-professional .PhoneInputCountrySelect {
//           border: none;
//           outline: none;
//           background: transparent;
//           cursor: pointer;
//         }

//         .phone-input-professional .PhoneInputCountryIcon {
//           width: 28px;
//           height: 20px;
//         }

//         .phone-input-professional .PhoneInputInput {
//           flex: 1;
//           min-width: 0;
//           border: none;
//           outline: none;
//           background: transparent;
//           padding: 0.75rem 0;
//           font-size: 1rem;
//           color: #0f172a;
//         }

//         .phone-input-professional .PhoneInputInput::placeholder {
//           color: #94a3b8;
//         }
//       `}</style>

//     </section>
//   );
// }

// export default Register;

import React, { useEffect, useState } from 'react';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import API_URL from '../components/api';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    fatherName: '',
    lastName: '',
    age: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: ''
  });

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ------------------------------------------------------------
  // LOAD COURSES
  // ------------------------------------------------------------

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoadingCourses(true);

        const response = await fetch(
          `${API_URL}/api/courses`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Could not load courses'
          );
        }

        setCourses(data.courses || []);
      } catch (error) {
        console.error(error);

        setError(
          error.message || 'Could not load courses'
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  // ------------------------------------------------------------
  // HANDLE INPUT
  // ------------------------------------------------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ------------------------------------------------------------
  // HANDLE PHONE NUMBER
  // ------------------------------------------------------------

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value || ''
    });
  };

  // ------------------------------------------------------------
  // HANDLE REGISTRATION
  // ------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert('Passwords do not match.');
      return;
    }

    if (!formData.country) {
      alert('Please select your country.');
      return;
    }

    if (!formData.phone) {
      alert('Please enter your phone number.');
      return;
    }
    
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/students/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Registration failed'
        );
      }

      alert('Registration successful!');

      setFormData({
        firstName: '',
        fatherName: '',
        lastName: '',
        age: '',
        country: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        course: ''
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // EYE ICON
  // ------------------------------------------------------------

  const EyeIcon = ({ visible }) => {
    if (visible) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.55 0 3.04-.337 4.37-.94"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.228 6.228A10.45 10.45 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.48 10.48 0 0 1-2.137 3.568"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.228 6.228 3 3m3.228 3.228 3.51 3.51m5.532 5.532L21 21m-4.73-4.73-3.27-3.27m0 0a3 3 0 1 1-4.243-4.243"
        />
      </svg>
    );
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 sm:px-6 py-12 md:py-16">

      <div className="max-w-5xl mx-auto">

        {/* -------------------------------------------------- */}
        {/* PAGE HEADER */}
        {/* -------------------------------------------------- */}

        <div className="text-center mb-10">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 mb-5">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75a17.933 17.933 0 0 1-7.5-1.632Z"
              />
            </svg>

          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Student Registration
          </h1>

          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Create your student account and register for
            your preferred course.
          </p>

        </div>


        {/* -------------------------------------------------- */}
        {/* ERROR MESSAGE */}
        {/* -------------------------------------------------- */}

        {error && (
          <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6 flex items-start gap-3">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="w-5 h-5 mt-0.5 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.007v.008H12V16.5Zm9-4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>{error}</span>

          </div>
        )}


        {/* -------------------------------------------------- */}
        {/* REGISTRATION FORM */}
        {/* -------------------------------------------------- */}

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >

          {/* FORM TITLE */}

          <div className="px-6 md:px-10 py-6 border-b border-slate-200 bg-slate-50">

            <h2 className="text-xl font-semibold text-slate-900">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Please provide your information accurately.
            </p>

          </div>


          <div className="p-6 md:p-10">

            <div className="grid md:grid-cols-2 gap-6">


              {/* FIRST NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* FATHER NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Father's Name
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  autoComplete="additional-name"
                  placeholder="Enter your father's name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* LAST NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* AGE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* COUNTRY */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country
                </label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select your country</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Other">Other</option>
                </select>

              </div>


              {/* PHONE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>

                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  defaultCountry="NL"
                  required
                  className="phone-input-professional"
                />

                <p className="text-xs text-slate-500 mt-2">
                  Enter your international phone number.
                </p>

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />

              </div>


              {/* COURSE */}

              <div className="md:col-span-2">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Course
                </label>

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={loadingCourses}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                >

                  <option value="">
                    {loadingCourses
                      ? 'Loading available courses...'
                      : 'Select your course'}
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course.name}
                    >
                      {course.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    <EyeIcon visible={showPassword} />
                  </button>

                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Choose a secure password for your account.
                </p>

              </div>


              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? 'text'
                        : 'password'
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pr-12 bg-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    <EyeIcon
                      visible={
                        showConfirmPassword
                      }
                    />
                  </button>

                </div>

              </div>

            </div>


            {/* ------------------------------------------------ */}
            {/* SUBMIT */}
            {/* ------------------------------------------------ */}

            <div className="mt-8 pt-6 border-t border-slate-200">

              <button
                type="submit"
                disabled={
                  loading ||
                  loadingCourses
                }
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Registering Student...'
                  : 'Complete Student Registration'}
              </button>

              <p className="text-center text-xs text-slate-500 mt-4">
                Please make sure all information is correct
                before submitting your registration.
              </p>

            </div>

          </div>

        </form>

      </div>

      {/* -------------------------------------------------- */}
      {/* PHONE INPUT STYLING */}
      {/* -------------------------------------------------- */}

      <style>{`
        .phone-input-professional {
          width: 100%;
          display: flex;
          align-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #ffffff;
          padding: 0.15rem 0.9rem;
          min-height: 54px;
          transition: all 0.2s ease;
        }

        .phone-input-professional:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
        }

        .phone-input-professional .PhoneInputCountry {
          display: flex;
          align-items: center;
          margin-right: 0.75rem;
        }

        .phone-input-professional .PhoneInputCountrySelect {
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
        }

        .phone-input-professional .PhoneInputCountryIcon {
          width: 28px;
          height: 20px;
        }

        .phone-input-professional .PhoneInputInput {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          padding: 0.75rem 0;
          font-size: 1rem;
          color: #0f172a;
        }

        .phone-input-professional .PhoneInputInput::placeholder {
          color: #94a3b8;
        }
      `}</style>

    </section>
  );
}

export default Register;