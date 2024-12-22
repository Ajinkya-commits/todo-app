import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
   <>
   <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
   <div className="overflow-x-hidden flex justify-between sm:justify-end relative items-center bg-white p-4 rounded-lg shadow-md mb-4 sm:ml-56 ">
            <button
              type="button"
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <div className="text-xl flex justify-end items-center z">
              <div className="pr-2">Welcome, {"User"}!</div>
              <div className="relative w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                <svg
                  className="relative w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                </svg>
              </div>
            </div>
          </div>
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        Have a question or feedback? Fill out the form below and we'll get back to you!
      </p>

      {submitted ? (
        <p className="text-center text-green-600 mt-4">Thank you for reaching out!</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 block w-full rounded-md border border-gray-300 shadow-sm"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-3 block w-full rounded-md border border-gray-300 shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 p-3 block w-full rounded-md border border-gray-300 shadow-sm"
              rows={5}
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
          >
            Submit
          </button>
        </form>
      )}
    </div>
   </>
  );
};

export default Contact;
