import React from 'react';

export default ({children}) => {
  const items = React.Children.toArray(children).filter(child => !!child);
  return items;
}