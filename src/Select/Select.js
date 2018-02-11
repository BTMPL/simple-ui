import React from 'react';
import styled, { css } from 'styled-components';
import withClickOutside from 'react-onclickoutside';

import SelectArrow from '@nta/trxm-frontend-react-common-components/atoms/ToggleArrow/ToggleArrow';

import Label from '@nta/trxm-frontend-react-common-components/atoms/Label/Label';


const WrapperBase = styled.div`
  box-sizing: border-box;
  display: block;
  position: relative;
  
  &::after, &::before {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    border-bottom: 1px solid #d3d3d3;
    transition: 0.25s width;
  }

  &::before {
    width: 100%;
  }

  &::after {
    border-color: red;
  }
`;

export const Wrapper = styled(WrapperBase)`
  ${props => props.error ? css`&::after { 
    width: 100%;    
  }` : undefined}

  ${props => props.valid ? css`&::after { 
    width: 100%;
    border-color: green;
  }` : undefined}  
`;

const SelectComponent = styled.div`
  box-sizing: border-box;
  height: 3.25rem;
  padding-top: 0.25rem;
  width: 100%;
  background: white;
  color: #333;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: inherit;  
  line-height: 1em;
  cursor: pointer;  
  user-select: none;
`

const PlaceholderComponent = styled.div`
  box-sizing: border-box;
  height: 3rem;
  padding: 1.25rem 5.2rem 0 0;
  position: relative;   
`;

const OptionsetBase = styled.div`
  min-height: 4.5rem;
  max-height: 15rem;
  overflow: auto;
  position: relative;
  z-index: 2;
`;

const Optionset = styled(OptionsetBase)`
  ${props => props.up ? css`
    transform: translateY(-100%);
    margin-top: -3.25rem;
  ` : undefined}
`

const OptionComponentBase = PlaceholderComponent.extend`
  height: 3rem;
  line-height: 3rem;
  padding: 0 5.2rem 0 1.125rem;
  background: #e7e7e7;
  z-index: 2;

  &:hover {
    background: #d3d3d3;
  }
`;

const OptionComponent = styled(OptionComponentBase)`
  ${props => props.disabled ? css`
    cursor: not-allowed;
    background: #e7e7e7 !important;
    color: #999999;
  ` : undefined}
`;



class Option extends React.PureComponent {

  handleClick = () => {
    if (!this.props.disabled) {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    return <OptionComponent onClick={this.handleClick} disabled={this.props.disabled}>{this.props.label}</OptionComponent>
  }
}

class Placeholder extends React.PureComponent {
  render() {
    return <PlaceholderComponent onClick={this.props.onClick}>{this.props.children}</PlaceholderComponent>
  }  
}

class Select extends React.Component {

  state = {
    open: false,
    up: false
  };

  ref: undefined;

  shouldRenderUp = (el, renderTarget = window) => {
    const elSize = el.getClientRects()[0];
    const spaceLeftBellow = window.innerHeight - (elSize.top + elSize.height);
    const spaceLeftAbove = elSize.top;
    // by default the container is 3.25rem
    const rem = elSize.height / 3.25;
    // so let's calculate dropdown size
    const spaceRequired = 3 * rem * this.props.options.length;

    // @TODO calculate and force size in case no space left below AND above
    
    return spaceLeftBellow < spaceRequired && spaceLeftAbove > spaceRequired;
  }

  handleToggle = () => {
    let up = this.state.up;

    if (!this.state.open) {
      up = this.shouldRenderUp(this.ref);
    }
    this.setState({
      open: !this.state.open,
      up
    });
  };

  handleClickOutside = () => {
    if (this.state.open) {
      this.setState({
        open: false
      })
    }
  }

  handleSelect = (value) => {
    if (this.state.open === true) {
      this.setState({
        open: false
      });
    }

    this.props.onChange(value);
  };

  renderPlaceholder = () => {
    if (this.props.renderPlaceholder) {
      return this.props.renderPlaceholder({
        item: this.props.options.find(item => item.value === this.props.value),
        onClick: this.handleToggle,
        isPlaceholder: !this.props.value
      });
    }
    else {
      let placeholder = this.props.placeholder;
      if (this.props.value) {
        placeholder = this.props.options.find(item => item.value === this.props.value).label;
      }
      return <Placeholder onClick={this.handleToggle}>{placeholder}</Placeholder>
    }
  }

  renderChoices = () => {
    if (!this.state.open) {
      return null;
    }
    return (
      <Optionset up={this.state.up}>
        {this.props.options.map(item => this.renderItem(item))}
      </Optionset>
    )
  }

  renderItem = (item) => {
    if (this.props.renderItem) {
      return this.props.renderItem({
        item,
        onClick: this.handleSelect
      });
    }
    else {
      return <Option key={`${item.label}.${item.value}`} onClick={this.handleSelect} {...item} />;
    }
  }

  setRef = el => this.ref = el;

  render() {
    const {
      label: selectLabel,
      placeholder,
      tabIndex,
      value,
      disabled = undefined
    } = this.props;

    return (
      <Wrapper hasLabel={!!selectLabel} className={this.props.className} innerRef={this.setRef}>
        {selectLabel && <Label collapsed={true}>{selectLabel}</Label>}
        <SelectComponent>
          {this.renderPlaceholder()}          
          {this.renderChoices()}
        </SelectComponent>
        <SelectArrow up={this.state.open} />
      </Wrapper>
    );
  }
};

export default withClickOutside(Select);