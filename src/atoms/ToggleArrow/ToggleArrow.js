import React from 'react';
import styled from 'styled-components';


const ToggleArrowComponent = ({
  className, color = '#0098db'
}) => (
  <svg width="1rem" height="1rem" viewBox="0 0 32 64" xmlSpace="preserve" className={className}>
    <polyline fill="#fff" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points="
	  32,64 0,32 32,0" />
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
  transform-origin: 50% 50% ;
  pointer-events: none;
  fill: #2282c1;
`;

const ToggleArrow = styled(ToggleArrowBase)`
  ${props => {
    if (props.left) return 'transform: rotate(-180deg) scaleX(-1);';
    else if(props.right) return 'transform: rotate(-180deg) scaleX(1);';
    else if(props.up) return 'transform: rotateX(180deg) rotate(-90deg);';
    else return 'transform: rotateX(0deg) rotate(-90deg);';
  }}
`;

export default ToggleArrow;