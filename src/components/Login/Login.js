import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import './Login.css';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const Login = () => {
     const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        console.log(e.target.name, e.target.value)
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = (isPasswordValid && passwordHasNumber);
        }
        if (isFormValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...res.user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }
       
    }

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email } = res.user;
        const signedInUser = {
          name: displayName,
          email: email,
        }
        setLoggedInUser(signedInUser);
        history.replace(from);
        console.log(displayName, email);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

    return (
        <div>
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <input className="email" onBlur={handleBlur} type="text" name="email" placeholder="Email" required /><br />
                    <input className="password" onBlur={handleBlur} type="password" name="password" placeholder="Password" required />
                    <input className="btn btn-success button" type="submit" value="Login" />
                </form>
                <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                {
                    loggedInUser.success && <p style={{ color: 'green' }}>User created successfully</p>
                }
            </div>
            <div className="googleLogin">
                <p>Or</p>
                <button onClick={handleGoogleSignIn} className="btn btn-success button"> Sign in With Google</button>
            </div>
        </div>
    );
};

export default Login;