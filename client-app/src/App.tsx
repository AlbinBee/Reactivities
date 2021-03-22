import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Components/hello';
import List from './Components/List';
import { cars } from './Components/Array';
import CarItem from './Components/CarItem';
import axios from 'axios';
import { Header, Icon } from 'semantic-ui-react'


class App extends Component {
  state = {
    values: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
    .then((response)=>{
      // console.log(response);
      this.setState({
        values: response.data
      })
    })
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <Icon name="users"/>
      <Header as='h2' icon='cart' content='Uptime Guarantee' />
        <Hello />
        <List />

        <ul>
          {cars.map((car)=> (
            <CarItem car={car}/>
              // <li>Color: {car.color} -- Model: {car.model} -- Top Speed: {car.topSpeed}</li>
          ))}
        </ul>
        <ul>
          {
            this.state.values.map((value:any)=>(
              <li key={value.id}>{value.name}</li>
            ))
          }
        </ul>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
