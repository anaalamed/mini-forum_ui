import styled from "styled-components";
import { createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    /* font-family: cursive; */
  font-family: "Yanone Kaffeesatz";


  }

  body {
  background: #252574
  }

  h1 {
    color: white;
    text-align: center;
    margin: 1rem;
    font-family: cursive;
    font-size: 3rem;
  }

  h2 {
    color: white;
    font-size: 3rem;
  }

  button {
    margin: 1rem;
  }

  input { 
    padding: 0.6rem;
  }

  A {
    letter-spacing: 0.2rem;
    text-decoration: none;
    text-transform: uppercase;
    padding: 1rem;
    &:hover {
      color: white;
      transition: 1s;
    }
  }

  .iconL {
    font-size: 2rem;
    margin-left: 1rem;
    &:hover {
      color: white;
    }
  }

`;

export default GlobalStyles;

export const Title = styled.div`
    /* background: #EDFFEF; */
    background: coral;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    border: 2px solid midnightblue;
    font-size: 3rem;
    color: midnightblue;
    text-shadow: 2px 2px 10px;
    font-family: cursive;
    &:hover {
      background: #FFFFFF;
      transition: 0.1s;
    }
`;

export const Button = styled.button`
  background: linear-gradient(to bottom, midnightblue 0%, thistle 100%);
  padding: 1rem;
  color: white;
  /* font-family: cursive; */
  font-size: 2rem;
  border-radius: 1rem;
  margin: 0;
  position: relative;
  left: 50%;
  transform: translate(-50%, 15%);
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem ;
  `;