import React, { useState } from "react";
import styled from "styled-components";

const Task = ({ title, description, isDone, onDelete, onToggle }) => {
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);

  const toggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <TaskContainer>
      <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TaskTitle>{title}</TaskTitle>
          <TaskActions>
            <TaskDeleteIcon onClick={onDelete}>❌</TaskDeleteIcon>
            <TaskCheckbox checked={isDone} onChange={onToggle} />

          </TaskActions>
        </div>
        <TaskDescription >
          {isDescriptionOpen
            ? description
            : description && description.length > 250
            ? description.slice(0, 250) + "..."
            : description}
        </TaskDescription>
        {description && description.length > 250 && (
          <ReadMoreButton onClick={toggleDescription}>
            {isDescriptionOpen ? "Show Less" : "Read More"}
          </ReadMoreButton>
        )}
      </div>

 
    </TaskContainer>
  );
};

const TasksList = ({ tasks, onDeleteTask, onToggleTask,tasks_is_loading:loading }) => {


    // To show the latest task on top
    const reversedTasks = [...tasks].reverse();
  return (
    <TaskListContainer>
      {loading ? (
        <p>Loading Tasks..</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <>
          <h3>Tasks</h3>
          {reversedTasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              isDone={task.isDone}
              onDelete={() => onDeleteTask(task.id)}
              onToggle={() => onToggleTask(task.id, task.isDone)}
            />
          ))}
        </>
      )}
    </TaskListContainer>
  );
};

export default TasksList;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TaskContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const TaskTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const TaskDescription = styled.p`
  font-size: 14px;
  margin: 8px 0;

  overflow: hidden;
  //   position: relative;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const TaskCheckbox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #333;
  border-radius: 4px;
  transition: background-color 0.3s, border-color 0.3s;
  outline: none;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::before {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 14px;
  }
`;


const TaskDeleteIcon = styled.span`
  font-size: 15px;
  color: #f00;
  cursor: pointer;
`;
const ReadMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
`;
