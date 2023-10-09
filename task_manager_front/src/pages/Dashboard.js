import React from "react";
import TaskStatusCards from "../components/dashboard/TaskStatusCards";
import TaskStatusCardsSkeleton from "../components/skeleton/TaskStatusCardsSkeleton";
import { useTasks } from "../context/TasksContext";
import TasksList from "../components/dashboard/TasksList";

function Dashboard() {
  const {
    tasks_is_loading,
    tasks,
    handleDeleteTask,
    hanldeCompleteTask,
    doneCount,
    activeCount,
    ongoingCount,
  } = useTasks();

  return (
    <div>
      {tasks_is_loading ? (
        <TaskStatusCardsSkeleton />
      ) : (
        <TaskStatusCards
          doneCount={doneCount}
          ongoingCount={ongoingCount}
          activeCount={activeCount}
        />
      )}

      <div>
        
     
          <TasksList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onToggleTask={hanldeCompleteTask}
            tasks_is_loading={tasks_is_loading}
          />
  
      </div>
    </div>
  );
}

export default Dashboard;
