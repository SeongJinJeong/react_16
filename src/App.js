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

class ErrorMaker extends Component{
  state ={
    friends : ["AbraHam","Bluger","Clamp","Drove"]
  };

  componentDidMount = () =>{
    setTimeout(()=>{
      this.setState({friends : undefined});
    },2000)
  }

  render(){
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

const ErrorFallBack = () => "Something Went Wrong ...."

class App extends Component {

  state={
    hasError : false,
  }

  componentDidCatch = (error,info) =>{
    this.setState({hasError:true});

    console.log(`Error is : ${error}, Info is : ${JSON.stringify(info)} `)
  }

  render(){
    const {hasError} = this.state;
    return (
      <div className="App">
        <Portals />
        {hasError ? <ErrorFallBack /> : <ErrorMaker />}
      </div>
    );
  }
}

export default App;
