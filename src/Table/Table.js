import React, { Component } from 'react';

import styled from "styled-components";

import TableHeader from '@nta/trxm-frontend-react-common-components/Table/TableHeader';
import TableFooter from '@nta/trxm-frontend-react-common-components/Table/TableFooter';

const TableComponent = styled.table`

`;

export default class Table extends Component {

  state = {
    opened: []
  }

  toggleRow = (key) => {
    if(this.state.opened.includes(key)) this.setState({
      opened: this.state.opened.filter(value => value !== key)
    })
    else {
      this.setState({
        opened: this.state.opened.concat(key)
      })
    }
  }

  isOpened = (key) => {
    return this.state.opened.includes(key);
  }

  closeAll = () => {
    this.setState({
      opened: []
    })
  }

  render() {
    
    return (
      <TableComponent className={this.props.className}>
        {this.props.header && <TableHeader>{this.props.header}</TableHeader>}
        {this.props.children({
          toggle: this.toggleRow,
          isOpened: this.isOpened,
          closeAll: this.closeAll
        })}
        {this.props.footer && <TableFooter>{this.props.footer}</TableFooter>}
      </TableComponent>
    )
  }
}