import styled from 'styled-components';

export default styled.span`
  box-sizing: border-box;
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  top: 0.375rem;
  left: 0.375rem;
  border-radius: 50%;
  border: 1px solid transparent;
  background: #0098db;

  opacity: 0;
  transition: 0.25s all;

  pointer-events: none;
`;