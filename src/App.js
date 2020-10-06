import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import firebase from "firebase";
import { firebaseConfig } from "./config";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import ChatRoom from './components/Chatroom/Chatroom';
firebase.initializeApp(firebaseConfig);
firebase.analytics();
function App() {
  function signUp(){
    document.getElementById('signin').style.width = "0%"
    setTimeout(() => {
      document.getElementById('signUp').style.width = "100%"
    }, 300);
  }
  function signIn(){
    document.getElementById('signUp').style.width = "0%"
    setTimeout(() => {
      document.getElementById('signin').style.width = "100%"
    }, 300);
  }
  

  return (
    <Router>
    <div>
      <Switch>
        <Route path="/chatroom">
          <ChatRoom />
        </Route>
        <Route path="/">
          <Login signUp ={signUp} signIn={signIn} />
        </Route>


      </Switch>
    </div>
    </Router>
  );
}

export default App;
