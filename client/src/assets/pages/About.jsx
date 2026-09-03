import React from 'react';

function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">
          About Us
        </h1>

        <p className="text-slate-600 mt-4">
          Learn more about our student registration system.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">

        <p className="text-slate-600 text-lg leading-8 mb-6">
          Our Student Registration System provides students with
          a simple way to discover courses, register for a course
          and manage their information.
        </p>

        <p className="text-slate-600 text-lg leading-8">
          The platform is designed to make the registration process
          simple, clear and easy to use on both computers and mobile devices.
        </p>

      </div>

    </section>
  );
}

export default About;