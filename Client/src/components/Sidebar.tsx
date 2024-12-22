import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
   isOpen: boolean;
   toggleSidebar: () => void;
 }
 
 const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }
   return (
     <>
       <div
         className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform duration-300 ease-in-out transform ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         } sm:translate-x-0`}
       >
         <aside
           className="h-full px-3 py-4 overflow-y-auto bg-gray-50 flex flex-col justify-between"
         >
           <button
             onClick={toggleSidebar}
             className="sm:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900"
           >
             <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="40px" fill="#434343"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
           </button>
 
           <ul className="space-y-2 font-medium">
             <li>
               <Link
                 to={'/task'}
                 className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   height="24px"
                   viewBox="0 -960 960 960"
                   width="24px"
                   fill="#434343"
                 >
                   <path d="m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                 </svg>
                 <span className="ms-3">Tasks</span>
               </Link>
             </li>
           </ul>
           <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
             <li>
               <Link
                 to={'/about'}
                 className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   height="24px"
                   viewBox="0 -960 960 960"
                   width="24px"
                   fill="#434343"
                 >
                   <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                 </svg>
                 <span className="ms-3">About</span>
               </Link>
             </li>
             <li>
                <Link
                 to={'/contact'}
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#434343"
                  >
                    <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                  <span className="ms-3">Help</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#434343"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                  <span className="ms-3">Logout</span>
                </button>
              </li>
           </ul>
         </aside>
       </div>
     </>
   );
 };
 
 export default Sidebar;
 