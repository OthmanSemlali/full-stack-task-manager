import { Link } from "react-router-dom";
import styled from "styled-components";


const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const ErrorMessage = styled.h1`
  font-size: 24px;
  color: #ff0000;
`;

function Error() {
  return (
    <NotFoundContainer>
      <ErrorMessage>404 - Page Not Found</ErrorMessage>
      <Link to="/">Go Home</Link>
    </NotFoundContainer>
  );
}

export default Error;
