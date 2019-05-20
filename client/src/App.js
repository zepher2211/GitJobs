import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './Components/navBar'
import loginScreen from './Components/loginScreen'
import mainContainer from './Containers/mainContainer'


function App() {
  return (
    <div className="App">
    <NavBar />
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={mainContainer} />
        <Route exact path="/login" component={loginScreen} />
      </React.Fragment>
    </BrowserRouter>
    </div>
  );
}

export default App;
