import React from 'react';
import styled from 'styled-components';


const ToggleArrowComponent = ({
  className
}) => (
  <svg focusable="false" viewBox="0 0 64 64" className={className}>
    <path d={'M5.3 13.25c-2.15 0-4.1 1.37-4.9 3.45-.82 2.1-.34 4.48 1.2 6.05l26.67 27.77c2.08 2.16 5.44 2.16 7.5 ' +
      '0l26.68-27.77c1.35-1.41.85-3.45 1.37-5.35-.5-1.9-1.93-3.4-3.76-3.9-1.83-.52-3.8.03-5.13 1.42l-22.9 ' +
      '23.86-22.9-23.86c-1-1.07-2.38-1.67-3.82-1.67z'} />
  </svg>
);


const ToggleArrowBase = styled(ToggleArrowComponent)`
  display: block;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: transform .3s ease;  
  transform-origin: 50% 50%;
  pointer-events: none;
  fill: #2282c1;
`;

const ToggleArrow = styled(ToggleArrowBase)`
  ${props => {
    if (props.left) return 'transform: rotate(90deg) scaleX(-1);';
    else if(props.right) return 'transform: rotate(-90deg);';
    else if(props.up) return 'transform: rotateX(180deg);';
    else return 'transform: rotateX(0deg);';
  }}
`;

export default ToggleArrow;