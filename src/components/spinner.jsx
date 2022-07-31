import styled from "styled-components";


const Spinner = (props) => {
  var msg = props.msg;
  if (msg === undefined) {
    msg = "Loading...";
  }
  return (
      <h1>{msg}</h1>
    
  );
};

export default Spinner;