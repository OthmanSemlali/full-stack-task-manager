import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
import TasksReducer from "../reducers/TasksReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../utils/constants";

const initialState = {
  tasks: [],
  tasks_is_loading: false,
 

  doneCount: 0,
  ongoingCount: 0,
  activeCount: 0,

  add_task_is_loading: false,
};

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const { token, logout } = useAuth();
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const getTasks = async () => {
    dispatch({ type: "TASKS_BEGIN" });

    try {
      const response = await axios.get(`${baseURL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;

      //   console.log("Tasksss:", data.tasks);
      const doneCount = data.tasks.filter((task) => task.isDone === 1).length;
      const ongoingCount = data.tasks.filter(
        (task) => task.isDone === 0
      ).length;
      const activeCount = data.tasks.length;

      dispatch({
        type: "TASKS_SUCCESS",
        payload: {
          tasks: data,
          doneCount,
          ongoingCount,
          activeCount,
        },
      });
    } catch (error) {
    //   console.log("Error fetching tasks:", error);

      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    getTasks();
  }, [token]);



  //   hanle delete task
  const handleDeleteTask = async (task_id) => {
    try {
   
      const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (!confirmed) {
       
        return;
      }
      const response = await axios.delete(
        `${baseURL}/api/tasks/${task_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "DELETE_TASK_SUCCESS",
          payload: {
            task_id,
          },
        });

        toast.success("Task deleted successfully");
      } else {
        // unexpected response status
        throw new Error("Failed to delete task, Try again later.");
      }
      //   }
    } catch (error) {
      console.error("Error deleting task:", error);

      if (error.response) {
        if (error.response.status === 401) {
          // Unauthorized
          logout();
          toast.error("Unauthorized! Logging out...");
        } else if (error.response.status === 403) {
          console.error("You can only delete your own tasks.");
        } else if (error.response.status === 404) {
          console.error("Task not found.");
        } else {
          toast.error("An error occurred while deleting the task.");
        }
      } else {
        toast.error("An error occurred while deleting the task.");
      }

  
    }
  };

  const hanldeCompleteTask = async (task_id, old_is_done_status) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/tasks/${task_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "UPDATE_TASK_SUCCESS",
          payload: {
            task_id,
          },
        });




        const done = !old_is_done_status;
        done
          ? toast.success("Congrats! Task completed successfully")
          : toast.info("Task marked as incomplete!");
  
      } else {
        
        throw new Error("Failed to update task, Try again later.");
      }
    } catch (error) {
      console.error("Error UPDATING task:", error);

      if (error.response) {
        if (error.response.status === 401) {
          // Unauthorized
          logout();
          toast.error("Unauthorized! Logging out...");
        } else if (error.response.status === 403) {
          console.error("You can only update your own tasks.");
        } else if (error.response.status === 404) {
          console.error("Task not found.");
        } else {
          toast.error("An error occurred while updating the task.");
        }
      } else {
        toast.error("An error occurred while updating the task.");
      }


    }
  };

  const hanldeAddTask = async ({ title, description }) => {
    dispatch({ type: "ADD_TASK_BEGIN" });
    try {
      const response = await axios.post(
        `${baseURL}/api/tasks`,
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "ADD_TASK_SUCCESS",
        payload: {
          task: response.data.task,
        },
      });
      toast.success("Task added successfully");
    } catch (error) {
      console.log("errr add task", error);
      dispatch({ type: "ADD_TASK_ERROR" });

      if(error.response && error.response.status === 401){
        logout();
        toast.error("Unauthorized! Logging out...");
      }

      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.title
      ) {
        toast.error(error.response.data.errors.title[0]);

      } else {
        toast.error("An error occurred while saving this task.");
      }
    }
  };
  return (
    <TasksContext.Provider
      value={{
        ...state,
        handleDeleteTask,
        hanldeCompleteTask,
        hanldeAddTask,
    
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
