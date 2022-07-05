import React from 'react';
import './CenterContainer.css';

const CenterContainer = (props) => {
  return (
    <div className="CenterContainer">
      {props.children}
    </div>
  )
};

export default CenterContainer;