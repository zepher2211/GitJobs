import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './Components/navBar'
import loginScreen from './Components/loginScreen'
import mainContainer from './Containers/mainContainer'
import signUpScreen from './Components/signUpScreen'
import quizCard from './Components/quizCard'
import PrivateRoute from './Containers/privateRoute'
import profileContainer from './Containers/profileContainer'

function App() {
  
  return (
    <div>
      {/* <NavBar /> */}
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Route exact path="/" component={mainContainer} />
          <Route exact path="/login" component={loginScreen} />
          <Route exact path="/signup" component={signUpScreen} />
          <Route exact path="/quiz" component={quizCard} />
          <PrivateRoute path="/profile" component={profileContainer} exact />
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
