import React from "react";
import ReactDOM from "react-dom";
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  html {
    font-size: 16px;
  }

  body {
    font-size: 1rem;
    font-family: 'Roboto';
  }

  p {
    font-size: 0.875rem;
  }
`

import Select from './Select/Select.js';
import Input from './Input/Input.js';
import { Radio, Checkbox } from './Radio/Radio.js';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeaderCell,
  TableRow 
} from './Table/index.js';

import Fragment from './atoms/Fragment';

const items = [
  {
    id: 1,
    title: 'test',
    description: 'hello world'
  },
  {
    id: 2,
    title: 'other row',
    description: 'other row description'
  }  
];


const Placeholder = styled.div`
  box-sizing: border-box;
  height: 3rem;
  padding: 1.4rem 5.2rem .6rem 0;
  position: relative;
`

const Option = Placeholder.extend`
  height: 3rem;
  line-height: 1rem;
  padding: .4rem 5.2rem 0 2rem;
  background: #e7e7e7;
  z-index: 2;

  &:hover {
    background: #d3d3d3;
  }
`

const Separator = Option.extend`
  padding-left: 0.6rem;
  padding-top: 0;
  border-top: 1px solid #d3d3d3;
  z-index: 2;

  height: 2.2rem;
  line-height: 2.2rem;

  &:hover {
    background: #e7e7e7;
  }

  b {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: blue;
  }
`

const renderItem = ({item, onClick}) => {
  if (item.separator) {
    return <Separator key={item.label}>{item.icon} {item.label}</Separator>
  }
  else if (item.ui) {
    return <Option key={item.value}>{item.ui({item, onClick})}</Option>
  }
  else {
    return <Option key={item.value} onClick={() => onClick(item.value)}>{item.label}<br />{item.subtitle}</Option>
  }
}

const renderPlaceholder = ({item, onClick, isPlaceholder}) => {
  if (isPlaceholder) {
    return <Placeholder onClick={onClick}>Custom select</Placeholder>
  }
  else if(item.date) {
    return <Placeholder onClick={onClick}>date: {item.date}</Placeholder>
  }
  else {
    return <Placeholder onClick={onClick}>{item.label}</Placeholder>
  }
}

const withValidator = (validators) => {

  //return (Component) => React.createElement(Component);

  return (Component) => {
    return class ComponentWrapped extends React.PureComponent {

      state = { 
        value: undefined,
        errors: []
      }

      handleChange = (v) => {
        this.setState({
          value: v
        });
        this.props.onChange(v);
      }

      validate = (e) => {
        const errors = validators.map(validator => validator(this.state.value)).filter(v => v);
        console.log(errors);
        this.setState({
          errors
        })        
      }

      render() {
        return React.createElement(Component, Object.assign({},
          this.props,
          { 
            error: this.state.errors.length,
            onChange: this.handleChange,
            onBlur: this.validate,
          }
        ));
      }
    }
  }
}

const ValidatedInput = withValidator([
  (v) => !v || v.length < 3
])(Input);

class App extends React.PureComponent {

  state = {
    selectDemoValue: '',
    selectDemoDate: undefined,
    checkboxDemo: false,
    inputDemo: '',

    radioDemoValue: 0,

    options: [
      {
        value: "123",
        subtitle: "DE12345678 1234577",
        label: "test"
      },
      {
        value: "1234",
        subtitle: "DE12345678 1234577",
        label: <span><b>test</b> HTML</span>
      },
      {
        label: "This is a separator",
        disabled: true,
        separator: true,
        icon: <b />
      },
      {
        value: 'date',
        label: 'Datepicker',
        ui: ({item, onClick}) => (
          <div style={{lineHeight: '2rem'}}><input type="date" value={this.state.options.find(item => item.value === 'date').date} onChange={(event) => {
            onClick(item.value);
            this.setState({
              selectDemoDate: event.target.value,
              options: this.state.options.map(item => {
                if (item.value === 'date') {
                  return Object.assign({}, item, {
                    date: event.target.value,
                  })
                }
                return item
              })
            })
          }} /></div>
        )
      }   
    ]    
  }

  setSelectDemoValue = value => this.setState({
    selectDemoValue: value
  });

  setRadioDemoValue = value => this.setState({
    radioDemoValue: value
  });

  setCheckboxDemo = value => this.setState({
    checkboxDemo: value
  });

  setInputDemo = value => this.setState({
    inputDemo: value
  });  
  

  render() {
    return (
      <div>
        <p>
         - select height 48px
         <br />- font size 14px??
        </p> 

        <Table header={
          <TableRow>
            <TableHeaderCell colSpan="2" style={{textAlign: 'left'}}>Hi!</TableHeaderCell>
          </TableRow>          
        } footer={
          <TableRow>
            <TableCell colSpan="2">Footer!</TableCell>
          </TableRow>
        }>
          {({toggle, isOpened, closeAll}) => {
            return <TableBody>
              {items.map(item => (
                <Fragment key={item.id}>
                  <TableRow>
                    <TableCell onClick={() => toggle(item.id)} width="15">
                      {isOpened(item.id) ? '-':'+'}
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                  </TableRow>
                  {isOpened(item.id) && <TableRow>
                    <TableCell colSpan="2">{item.description}</TableCell>
                  </TableRow>}                                    
                </Fragment>
              ))}
              <TableRow>
                <TableCell colSpan="2">
                  <button onClick={closeAll}>close all</button>
                </TableCell>
              </TableRow>        
            </TableBody>
          }}
        </Table>        
        
        <Input 
          label={"O hai there"}
          type="text" 
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        />

        <br />        

        <Input 
          label={"O hai there"}
          placeholder="Type something"
          type="text" 
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        />

        <br />

        <Input 
          label={"O hai there"}
          type="text" 
          disabled={"disabled"}
          value={"This one is disabled"}
        />        

        <br />

        <Input 
          multiline={true}
          label={"O hai there"}
          type="text" 
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        /> 
        
        <br />

        <Input 
          multiline={true}
          label={"O hai there"}
          placeholder="Edit me"
          type="text" 
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        />

        <br />

        <Input 
          label={"O hai there"}
          placeholder="this one is using render props"
          renderInput={(props) => <input style={{background: 'red'}} {...props} type="text" />}
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        />         
        
        <br />        

        <ValidatedInput 
          label={"O hai there"}
          type="text" 
          value={this.state.inputDemo}
          onChange={this.setInputDemo}
        />
        
        <br />

        <Select 
          label="Select something" 
          placeholder="Hello world"         
          options={this.state.options}         
          value={this.state.selectDemoValue}         
          onChange={this.setSelectDemoValue}
        />   

        <br />
        
        <Select 
          label="Select something" 
          placeholder="Hello world"         
          options={this.state.options}         
          value={this.state.selectDemoValue}         
          onChange={this.setSelectDemoValue}
          renderItem={renderItem}
          renderPlaceholder={renderPlaceholder}
        /> 

        <br />
        
        
        <Radio 
          onClick={() => this.setRadioDemoValue(0)} 
          checked={this.state.radioDemoValue === 0} 
        />

        <Radio 
          onClick={() => this.setRadioDemoValue(1)} 
          checked={this.state.radioDemoValue === 1} 
        />

        <Radio 
          border={false}
          onClick={() => this.setRadioDemoValue(0)} 
          checked={this.state.radioDemoValue === 1} 
          renderIcon={({checked}) => checked ? <span style={{color: '#0098db'}}>👁</span> : <span style={{color: '#0098db', textDecoration: 'line-through'}}>👁</span>}
        />

        <Radio disabled={"disabled"} />
        
        <br />

        <Checkbox 
          checked={this.state.checkboxDemo} 
          onClick={(checked) => this.setCheckboxDemo(checked)} 
        />
        
        <Checkbox 
          checked={this.state.checkboxDemo} 
          onClick={(checked) => this.setCheckboxDemo(checked)} 
          border={false}
          renderIcon={({checked}) => checked ? <span style={{color: '#0098db'}}>👁</span> : <span style={{color: '#0098db', textDecoration: 'line-through'}}>👁</span>}
        />         

        <Checkbox disabled={"disabled"} />        
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("react-app"));

if(module.hot) {
  module.hot.accept();
}
