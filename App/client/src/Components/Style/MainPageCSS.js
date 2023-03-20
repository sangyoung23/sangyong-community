import styled from "@emotion/styled";

const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  input {
    border-radius: 10px;
    border: 1px solid black;
    padding: 10px;
    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const MoreBtn = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: white;
    &:hover {
      background-color: black;
      color: white;
      border: 1px solid white;
    }
  }
`;

export { MainDiv, MoreBtn };
