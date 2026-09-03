import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-slate-400">
          © 2026 Student System. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-slate-400">
          <span>Student Registration</span>
          <span>•</span>
          <span>Education</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;