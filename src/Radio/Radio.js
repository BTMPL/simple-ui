import React from 'react';
import styled, { css } from 'styled-components';

import RadioBorder from '@nta/trxm-frontend-react-common-components/atoms/DotOutline';
import RadioIcon from '@nta/trxm-frontend-react-common-components/atoms/Dot';

const WrapperBase = styled.label`
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  margin: .5rem .5rem 0 0;
  text-align: center;
  line-height: 1.5rem;

  input {
    opacity: 0;
    position: absolute;
    top: -2rem;
    left: -2rem;
  }  

  :hover {
    ${RadioIcon} {    
      opacity: 1;
    }

    ${RadioBorder} {
      border-color: #0098db;
    }
  }

  input:checked ~ ${RadioIcon} {
    opacity: 1;
  }
`
const Wrapper = styled(WrapperBase)`
  ${props => props.disabled ? css`    
    cursor: not-allowed;  
    opacity: 0.3;

    &:hover ${RadioBorder}, ${RadioBorder} {
      border-color: #d3d3d3;
    }

    ${RadioIcon} {
      display: none;
    }
  ` : undefined}
`;


const Radio = ({ onClick = () => {}, checked = false, disabled, renderIcon = undefined, className }) => (
  <Wrapper disabled={disabled} className={className}>
    <input type="radio" checked={checked} onChange={onClick} />
    {renderIcon ? renderIcon({ checked }) : [<RadioIcon key="icon" />, <RadioBorder key="border" />]}
  </Wrapper>
)

const CheckboxIcon = RadioIcon;
const CheckboxBorder = styled(RadioBorder)`
  border-radius: 3px;
`;


const Checkbox = ({ onClick = () => {}, checked = false, disabled,  renderIcon = undefined, className }) => (
  <Wrapper disabled={disabled} className={className}>
    <input type="checkbox" checked={checked} onChange={(event) => onClick(event.target.checked)} />
    {renderIcon ? renderIcon({ checked }) : [<CheckboxIcon key="icon" />, <CheckboxBorder key="border" />]}
  </Wrapper>
)


export {
  Radio,
  Checkbox
}