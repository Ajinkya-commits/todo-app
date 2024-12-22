import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Tooltip from "@/components/Tooltip";
import Checkbox from "@/components/Checkbox";
import { useTasks } from "@/hooks";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useLocation } from "react-router-dom";
import Cookies  from "js-cookie";
import Skeleton from "@/components/Skeleton";

interface Task {
  id: string;
  updatedAt: string; 
  title: string;
  description: string;
  priority: string;
}


const Tasks = () => {
  const [selected, setSelected] = useState<Task[]>(() => {
    const storedSelected = Cookies.get('selectedTasks');
    return storedSelected ? JSON.parse(storedSelected) : [];
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading, tasks } = useTasks(); 
  const location = useLocation();
  const name = location.state?.name;
  
  const handleCheckbox = (task: Task) => {
    setSelected((prev) => {
      const updatedSelected = prev.some((t) => t.title === task.title)
        ? prev.filter((t) => t.title !== task.title)
        : [...prev, task];
        
        Cookies.set('selectedTasks', JSON.stringify(updatedSelected), { expires: 7 });
        return updatedSelected;
      });
    };
    
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);
    const openTask = tasks.find(task => task.id === openTaskId);
    const [editTask, setEditTask] = useState<Task | null>(null);
    
    
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
      setIsEditing(true);
      if (openTask) {
        setEditTask(openTask);  
      }
    };
    
    
    const handleClick = (id: string) => {
      setOpenTaskId((prevId) => (prevId === id ? null : id)); 
    };
    

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSave = async () => {
    if (!editTask) return;

    try {
      const updatedTask = {
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
      };

      await axios.put(
        `${BACKEND_URL}/api/v1/todos/${openTaskId}`,
        updatedTask,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setEditTask(null); 
      setOpenTaskId(null);
      window.location.reload();
    } catch (error) {
      console.error("Error while updating task", error);
    }
  };

  return (
    <>
      <div className={`h-screen flex ${openTaskId !== null ? "blur-sm" : ""}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 bg-gray-100 overflow-hidden p-2 sm:px-10 ">
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
              <div className="pr-2">Welcome, {name || "User"}!</div>
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
          <div className="sm:ml-56 grid sm:grid-cols-2 p-2 h-full overflow-y-scroll no-scrollbar">
            {/* left div */}
            <div className="p-2">
              <div className="bg-[#e3eae9] rounded-lg flex flex-col text-center relative h-4/5 ">
                <Tooltip></Tooltip>

                <div className="overflow-y-scroll no-scrollbar max-h-[540px]">
          {loading ? (
            <div className="rounded-lg flex flex-col text-center ">
             <div className="rounded-lg flex flex-col text-center bg-[#f1f0f1] m-2 p-2" ><Skeleton></Skeleton></div>
             <div className="rounded-lg flex flex-col text-center bg-[#f1f0f1] m-2 p-2" ><Skeleton></Skeleton></div>
             <div className="rounded-lg flex flex-col text-center bg-[#f1f0f1] m-2 p-2" ><Skeleton></Skeleton></div>
             <div className="rounded-lg flex flex-col text-center bg-[#f1f0f1] m-2 p-2" ><Skeleton></Skeleton></div>
            </div>
          ) : (
            tasks.filter((task) => !selected.some((t) => t.id === task.id)).map((task, index) => (
              <div
              onClick={() => handleClick(task.id)}
        key={index}
        className="cursor-pointer shadow-lg bg-[#f1f0f1] p-2 m-2 rounded-lg"
      >
        <div  className=" flex justify-between text-left">
            Title : {task.title}
          <div className="flex text-lg">
            <Checkbox key={task.id} onChange={() => handleCheckbox(task)} />
          <svg
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#434343"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
          </div>
        </div>
        <div className="text-left text-xs text-slate-400 py-1">
          {`Last modified: ${task.updatedAt}`}
        </div>
        <p className="text-left text-sm">{task.description.slice(0, 40) + "....."}</p>
      </div>
    ))
  )}
</div>

              </div>
            </div>
            {/* right div */}
            <div className="p-2">
              <div className="bg-[#e3eae9] rounded-lg flex flex-col text-center relative h-4/5 overflow-y-scroll no-scrollbar">
                <div className="ubuntu-bold text-xl p-4 border-b-2 border-black">Completed Task</div>
                
                {selected.map((task) => (
                      <div
                      onClick={() => handleClick(task.id)}
                      key={task.id}
                      className="cursor-pointer shadow-lg bg-[#f1f0f1] p-2 m-2 rounded-lg"
                    >
                      <div className="flex justify-between text-left">
                          Title :  {task.title}
                        <div className="flex text-lg">
                          <Checkbox key={task.id}
                           checked
                           onChange={() => handleCheckbox(task)} />
                        <svg
                          className="cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#434343"
                          >
                          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                        </svg>
                          </div>
                      </div>
                      <div className="text-left text-xs text-slate-400 py-1">
                        {`Last modified: ${task.updatedAt}`}
                      </div>
                      <p className="text-left text-sm">{task.description.slice(0,40) + "......."}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating div*/}

      {openTaskId !== null && (
  <div className="flex justify-center">
    <div
      className={`absolute top-0 bottom-0 z-50 bg-[#e3eae9] m-6 p-4 sm:p-8 rounded-lg shadow-lg mx-4 h-4/5 w-5/6 sm:w-3/5`}
    >
      <div className="flex justify-between">
        <div className="text-xl ubuntu-bold">Task</div>
        <button onClick={() => handleClick(openTask?.id ?? '')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#434343"
          >
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
          </svg>
        </button>
      </div>

      {openTask ? (
        <div className="flex flex-col justify-between h-4/5">
          <div className="flex flex-col justify-center py-1 ubuntu-medium">
  <form className="space-y-4">
    <div className="text-xl pt-4 font-semibold border-[#304140] border-t-2 flex">
      Title: 
      <input
        type="text"
        value={editTask?.title ?? openTask?.title ?? ""}
        disabled={!isEditing}
        onChange={(e) =>
          setEditTask((prev) =>
            prev ? { ...prev, title: e.target.value } : { ...openTask, title: e.target.value }
          )
        }
        className="w-full px-1 border rounded-sm"
      />
    </div>
    <div className="text-xs pb-2 text-slate-400 w-full">
      Last modified: <span className="font-thin">{openTask.updatedAt}</span>
    </div>
    <div className="text-xl  border-[#304140] border-b border-t font-semibold">
      Description: 
      <textarea
         value={editTask?.description ?? openTask?.description ?? ""}
        onChange={(e) =>
          setEditTask((prev) =>
            prev ? { ...prev, description: e.target.value } : { ...openTask, description: e.target.value }
          )
        }
        disabled={!isEditing}
        className="w-full px-1 border rounded-sm"
        rows={4}
      />
    </div>
    <div className="text-xl py-1 font-semibold border-[#304140] border-b">
      Priority: 
      <input
        type="text"
        value={editTask?.priority ?? openTask?.priority ?? ""}
        disabled={!isEditing}
        onChange={(e) =>
          setEditTask((prev) =>
            prev ? { ...prev, priority: e.target.value } : { ...openTask, priority: e.target.value }
          )
        }
        className="w-full px-1 border rounded-sm"
      />
    </div>
  </form>
</div>


          <div className="flex justify-between">
            <div>
              <button
                type="button"
                onClick={handleEditClick}
                className="text-green-600 mb-1 bg-white font-medium rounded-lg text-sm px-8 py-2.5"
              >
                Edit
              </button>
              <button
                type="submit"
                onClick={async () => {
                  const confirm = window.confirm("Are you sure you want to delete this task?");
                  if (confirm) {
                    try {
                      const id = openTask.id;
                      await axios.delete(`${BACKEND_URL}/api/v1/todos/${id}`, {
                        headers: {
                          Authorization: localStorage.getItem('token'),
                        },
                      });
                      window.location.reload();
                    } catch (error) {
                      console.error("Error while deleting task", error);
                    }
                  }
                }}
                className="mt-1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-2.5"
              >
                Delete
              </button>
            </div>
            <div>
            <button
  type="button"
  onClick={ handleSave } 
  className="text-white bg-gray-600 hover:bg-gray-900 font-medium rounded-lg text-sm px-8 py-2.5"
>
  Save
</button>

            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-red-500">
          Task not found
        </div>
      )}
    </div>
  </div>
)}
    </>
  );
};

export default Tasks;
