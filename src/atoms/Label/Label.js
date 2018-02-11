import styled from 'styled-components';

const LabelBase = styled.span`
  pointer-events: none;
  position: absolute;  
  top: 1.5rem;
  left: 0;
  color: #999;
  font-size: 0.875rem;
  line-height: 1;
  white-space: nowrap;  
  transform-origin: 0 0;
  transition: 0.25s transform;  
`;

const Label = styled(LabelBase)`
  transform: ${props => props.collapsed ? `translateY(-1.4rem) scale(.75)` : `translateY(0rem) scale(1);`}
`;

export default Label;