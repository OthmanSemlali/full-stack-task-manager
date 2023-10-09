import React from 'react';
import { FaDivide } from 'react-icons/fa';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: calc(33.33% - 16px); /* Three cards per row on larger screens */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CardIcon = styled.div`
  font-size: 24px;
  margin-right: 16px;
`;



const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const CardCount = styled.p`
  font-size: 16px;
  color: #888;
  margin: 0;
`;

const TaskStatusCard = ({ icon, title, count }) => {
  return (
    <CardContainer>
      <CardRow>
        <CardIcon>{icon}</CardIcon>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardCount>{count} {count <= 1 ? "task" : "tasks"} </CardCount>
        </div>
      </CardRow>
    </CardContainer>
  );
};

const TaskStatusCards = ({ doneCount, ongoingCount, activeCount }) => {
  return (
    <CardsContainer>
      <TaskStatusCard icon="⚡" title="Active" count={activeCount} />
      <TaskStatusCard icon="⏳" title="Ongoing" count={ongoingCount} />

      <TaskStatusCard icon="✅" title="Done" count={doneCount} />
    </CardsContainer>

  );
};

export default TaskStatusCards;
