const TasksReducer = (state, action) => {
  switch (action.type) {
    case "TASKS_BEGIN":
      return {
        ...state,
        tasks_is_loading: true,
      };

    case "TASKS_SUCCESS":

    
      return {
        ...state,
        tasks_is_loading: false,
        tasks: action.payload.tasks.tasks,
        doneCount: action.payload.doneCount,
        ongoingCount: action.payload.ongoingCount,
        activeCount: action.payload.activeCount,
      };

    case "UPDATE_TASK_SUCCESS":
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.task_id) {
          return {
            ...task,
            isDone: !task.isDone,
          };
        }
        return task;
      });

      const doneCount = updatedTasks.filter((task) => task.isDone).length;
      const ongoingCount = updatedTasks.filter((task) => !task.isDone).length;
      const activeCount = updatedTasks.length;

      return {
        ...state,
        tasks: updatedTasks,
        doneCount,
        ongoingCount,
        activeCount,
      };

    case "DELETE_TASK_SUCCESS":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload.task_id
      );

      const doneC = filteredTasks.filter((task) => task.isDone).length;
      const ongoingC = filteredTasks.filter((task) => !task.isDone).length;
      const activeC = filteredTasks.length;

      return {
        ...state,
        tasks: filteredTasks,
        doneCount:doneC,
        ongoingCount:ongoingC,
        activeCount:activeC,
      };


    case "ADD_TASK_BEGIN":
        return {
            ...state,
            add_task_is_loading: true,
        };

    case "ADD_TASK_SUCCESS":
        return {
            ...state,
            add_task_is_loading: false,
            tasks: [...state.tasks, action.payload.task],
            activeCount:state.activeCount+1,
        };

    case "ADD_TASK_ERROR":
        return {
            ...state,
            add_task_is_loading: false,
        };

    default:
      return state;
  }
};

export default TasksReducer;
