import styled from 'styled-components';

export default styled.span`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #d3d3d3;

  transition: 0.25s all;

  pointer-events: none;

  &:hover {
    border-color: red;
  }
`;