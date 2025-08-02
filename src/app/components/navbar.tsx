import React from 'react';
import { Merriweather_Sans, Raleway } from 'next/font/google';

const merri = Merriweather_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export default function Navbar() {
  return (
    // Displaying navbar with icon and application name
    <header className="text-teal-500 body-font">
      <div className="container mx-auto py-5 flex-row items-center justify-center sm:justify-start">
        <div className="flex items-center space-x-2">
          <a
            href="/"
            className="flex items-center text-teal-500 hover:text-teal-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              className="w-10 h-10 text-teal-500 p-2 bg-teal-100 rounded-full"
              viewBox="0 0 16 16"
            >
              <path d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2" />
            </svg>
            <span className={`${merri.className} ml-2 text-lg sm:text-2xl`}>Eventify</span>
          </a>
          <div className="border-l border-white h-6" />
          <nav className={`${raleway.className}`}>
            <a
              href="/dashboard"
              className="pl-1 text-base hover:text-teal-600 transition-colors"
            >
              Events
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
