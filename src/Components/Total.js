import React from 'react';

const Total = (props) => {
  //if(props.total.hasTotal === false){
//	  return '';
 // }
  return (
    <div className="cr-total">
      Total: <span className="total">{props.total.value.toFixed(2)} USD</span>
    </div>
  )
};

export default Total;
