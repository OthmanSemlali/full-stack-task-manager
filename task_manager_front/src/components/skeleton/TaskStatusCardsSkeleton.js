
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SkeletonCard = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: calc(33.33% - 16px); /* Three cards per row on larger screens */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${loadingAnimation} 1.5s infinite;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  height: 34px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;




const TaskStatusCardSkeleton = () => {
  return (
    <SkeletonCard>
      <SkeletonRow>
   
      </SkeletonRow>
    </SkeletonCard>
  );
};

const TaskStatusCardsSkeleton = () => {
  return (
    <SkeletonContainer>
      <TaskStatusCardSkeleton />
      <TaskStatusCardSkeleton />
      <TaskStatusCardSkeleton />
    </SkeletonContainer>
  );
};

export default TaskStatusCardsSkeleton;
