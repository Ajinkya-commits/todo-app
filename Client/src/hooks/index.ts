import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";
import { format } from 'date-fns';

interface Task {
  id:string,
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  updatedAt: string;
}

export const useTasks = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.log("not authenticated...");
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/v1/todos?userId=${userId}`, {
      headers: {
        Authorization: token,
      }
    })
    .then(response => {
      console.log(response.data);  

    
      setTasks(response.data.map((task: Task) => ({
        ...task,
        updatedAt: format(new Date(task.updatedAt), 'dd/MM/yyyy')  
      })));
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []); 

  return {
    loading,
    tasks,
  };
};
