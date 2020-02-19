import React,{Component} from 'react';
import {createPortal} from 'react-dom';
import logo from './logo.svg';
import './App.css';

const boundaryHOC = (protectedComponents) => class boundary extends Component {
  state = {
    hasError : false,
  }

  componentDidCatch=(err,info)=>{
    this.setState({hasError:true});
    console.log(`Error is : ${err} , Info is : ${JSON.stringify(info)}`)
  };

  render(){
    const { hasError } = this.state;
      if(hasError){
        return <ErrorFallBack />
      }else{
        return <ErrorMaker />
      }
  }
}
// HOC 

class Portals extends Component {
  render(){
    return createPortal(<Message />,document.getElementById("touchme"))
  }
}

const pPortals = boundaryHOC(Portals);

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
const pErrorMaker = boundaryHOC(ErrorMaker);

const ErrorFallBack = () => "Something Went Wrong ...."

class App extends Component {

  render(){
    return (
      <div className="App">
        <pPortals />
        <pErrorMaker />
      </div>
    );
  }
}

export default boundaryHOC(App);
