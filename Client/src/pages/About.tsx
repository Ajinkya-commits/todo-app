import Sidebar from "@/components/Sidebar";
import { useState } from "react";


const About = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (<>
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
    <div className="h-full w-4/5 flex-1 text-left overflow-hidden sm:px-10  container mx-auto p-6 sm:ml-56" >
      <h1 className="text-4xl font-bold  text-blue-600">About Remind Me</h1>
      <p className="mt-4 text-lg text-gray-700 ">
        Welcome to Remind Me, your personal task manager to stay organized and on top of your daily to-dos.
      </p>
      
      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-blue-500">Our Mission</h2>
        <p className="mt-2 text-lg text-gray-700">
          Remind Me is designed to help you manage your tasks efficiently and effectively. Whether it's a work task, a study reminder, or a personal goal, Remind Me allows you to keep track of your activities in a seamless and simple interface.
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-blue-500">Features</h2>
        <ul className="mt-2 list-disc pl-5 text-lg text-gray-700">
          <li>Simple task creation and management</li>
          <li>Set priorities to keep important tasks on top</li>
          <li>View and modify task descriptions</li>
          <li>Stay organized with task statuses (completed/in-progress)</li>
          <li>Save your tasks and preferences across sessions with cookies</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-blue-500">Get in Touch</h2>
        <p className="mt-2 text-lg text-gray-700">
          If you have any questions or feedback, feel free to reach out to us. We'd love to hear from you!
        </p>
      </div>
    </div>
    </>
  );
};

export default About;
