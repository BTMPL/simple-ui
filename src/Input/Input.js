import React from 'react';
import styled, { css } from 'styled-components';
import withClickOutside from 'react-onclickoutside';

import { 
  Wrapper 
} from '@nta/trxm-frontend-react-common-components/Select/Select.js';
import Label from '@nta/trxm-frontend-react-common-components/atoms/Label/Label';


const InputWrapper = Wrapper.extend`
  min-height: 3rem;
  overflow: hidden;

  textarea, input {
    box-sizing: border-box;
    height: 3rem;
    padding: 1.4rem 0 0.6rem 0px;
    border: 0;
    width: 100%;
    outline: 0;
    font-size: 0.875rem;       
    
    &[disabled] {
      cursor: not-allowed;
    }
  }

  textarea {
    font-family: inherit;
    margin-top: 1.4rem;
    padding-top: 0;
    height: 8rem;
  }
`;



class InputComponent extends React.PureComponent {

  state = {
    focused: false
  }

  focus = () => {
    this.setState({
      focused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  blur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }    
  }

  handleClickOutside = () => {
    if (!this.props.value) {
      this.setState({
        focused: false
      })
    }
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  getInputProps = () => {
    return {
      type: this.props.type,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      value: this.props.value,
      onFocus: this.focus,
      onBlur: this.blur,
      onChange: this.handleChange
    }    
  }

  render() {
    const inputProps = this.getInputProps();
    const Component = this.props.multiline ? 'textarea' : 'input';
    return (
      <InputWrapper error={this.props.error} valid={this.props.valid} className={this.props.className}>
        {this.props.renderInput ? this.props.renderInput(inputProps) : <Component {...inputProps} />}
        {this.props.label && <Label collapsed={this.state.focused || this.props.value || this.props.placeholder}>{this.props.label}</Label>}
      </InputWrapper>
    )
  }
}

export default withClickOutside(InputComponent);

