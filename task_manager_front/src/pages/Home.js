import React from 'react';

import styled from 'styled-components';
import logo from '../images/logoHome.svg';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <Wrapper>
      <div className='container'>
        <img src={logo} alt='task manager' />

        <h1>task manager</h1>

        <Link to='/login' className='btn'> Log In / Sign Up</Link>
      
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    max-height: 300px;
    
  
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Home;