import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./login.scss";
import firebase from "firebase";

function Login(props) {
  // console.log(firebase)
  //   console.log(props);
//   let [userObj, setUserObj] = useState({})
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.history.push("/chatroom");
      }
    });
  }, []);
  function logInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()

      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // alert("login success");
        let UserObj = {
            name: user.displayName,
            dp: user.photoURL,
            uid: user.uid,
            email: user.email,
          };
          console.log(user.uid,UserObj) 
          firebase.database().ref("Users").child(user.uid).set(UserObj).then(()=>{
              console.log('true')
          }).catch((err)=>{
              console.log(err)
          })
        props.history.push("/chatroom");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  //   console.log(firebase.database())
  function logInFb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()

      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // alert("login success");
        let UserObj = {
          name: user.displayName,
          dp: user.photoURL,
          uid: user.uid,
          email: user.email,
        };
        console.log(user.uid,UserObj) 
        firebase.database().ref("Users").child(user.uid).set(UserObj).then(()=>{
            console.log('true')
        }).catch((err)=>{
            console.log(err)
        })
        props.history.push("/chatroom");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  return (
    <div className="mainDiv">
      <div className="loginBody">
        <h1 className="heading">Chat Application</h1>
        <div className="login">
          <div id="signin" className="SignIn">
            <h3>Sign In</h3>
            <div className="signInMethod">
              <div className="signInForm">
                <h4>Sign In with an existing account</h4>
                <input
                  className="signInFields"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="signInFields"
                  placeholder="Password"
                  type="password"
                />
                <button className="signInFields">Sign In</button>
                <p className="creatAcc">
                  Doesn't have Account?{" "}
                  <span onClick={() => props.signUp()}>
                    Create Your Account
                  </span>
                </p>
              </div>
              <hr />
              <div className="signInButton">
                <h4>Sign In with your socail accounts</h4>
                <button onClick={() => logInFb()} className="signInFields">
                  Sign In With Your Facebook
                </button>
                <button onClick={() => logInGoogle()} className="signInFields">
                  Sign In With Your Gmail
                </button>
              </div>
            </div>
          </div>
          <div id="signUp" className="SignUp">
            <h3>Sign Up</h3>
            <div className="signUpForm">
              <div className="signName">
                <input
                  className="signUpFields"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="signUpFields"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="emailPass">
                <input
                  className="signUpFields"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="signUpFields"
                  type="password"
                  placeholder="Password"
                />
                <input
                  className="signUpFields"
                  type="password"
                  placeholder="Confirm Your Password"
                />
                <button className="signUpFields">Sign Up</button>
                <p className="haveAcc">
                  Have an Account?{" "}
                  <span onClick={() => props.signIn()}>SignIn Now</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
