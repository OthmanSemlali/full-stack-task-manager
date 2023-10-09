import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useTasks } from '../../context/TasksContext';



export const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { hanldeAddTask, add_task_is_loading } = useTasks();




  const handleSubmit = () => {
    if (title.trim() === '') {
      if (!toast.isActive('taskTitleToast')) {
        toast.error('Task title is required.', { toastId: 'taskTitleToast' });
      }
      return;
    }

    hanldeAddTask({ title, description });

    setTitle('');
    setDescription('');
  };

  return (
    <AddTaskContainer>
      <h3>Add New Task</h3>
      <TaskInput
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TaskTextArea
        rows="4"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <AddTaskButton onClick={handleSubmit}>
      {add_task_is_loading ? (
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span className='loading-spinner'></span>
           <span>sending..</span>
         </div>
         

      
      ) : (
        'Add Task'
      )}
      </AddTaskButton>
    </AddTaskContainer>
  );
};


const AddTaskContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-top: 16px;
`;

const TaskInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
`;

const TaskTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  resize: vertical;
`;

const AddTaskButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;