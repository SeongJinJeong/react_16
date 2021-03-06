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

const MAX_PIZZA = 20;

const pizzaUp = (state,props) =>{
  const { pizzas } = state;
  if(pizzas < 20){
    return {
      pizzas : pizzas+1
    }
  }else{
    return null;
  }
}

class Controlled extends Component {
  state = {
    pizzas: 0
  }

  render(){
    const { pizzas } = this.state;
    return(
      <button onClick={this._clickHandler}>{`I have eaten ${pizzas} ${pizzas === 0 || 1? "pizza" : "pizzas"}`}</button>
    )
  }

  _clickHandler = () =>{
    this.setState(pizzaUp);
  }
}

class App extends Component {

  render(){
    return (
      <div className="App">
        <pPortals />
        <Controlled />
      </div>
    );
  }
}

export default App;
