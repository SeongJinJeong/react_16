import React,{Component} from 'react';
import {createPortal} from 'react-dom';
import logo from './logo.svg';
import './App.css';

class Portals extends Component {
  render(){
    return createPortal(<Message />,document.getElementById("touchme"))
  }
}

const Message = () =>{
  return(
    "Touched You!"
  )
}

function App() {
  return (
    <div className="App">
      <Portals />
    </div>
  );
}

export default App;
