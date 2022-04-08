import React, { useState } from 'react';
import "./PopUpGoogle.css"
import app from '../../firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth(app);


const PopUpGoogle = () => {
  const [user, setUser] =useState({})

  //google
    const provider = new GoogleAuthProvider(); 

    //github
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => (

    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error => {
      console.log("error" ,error)
    })
    );

    const handleGoogleSignOut = () => {
      signOut(auth)
      .then(()=> {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
    }

const handleGithubSignIn = () => {
  signInWithPopup(auth, githubProvider)
  .then(result => {
    const user = result.user;
    console.log(user)

  })
  .catch(error => {
    console.log("error" ,error)
  })
}
    return (
        <div>
          {/* toogle button
          {condition ? true :false} */}
            {
              user.email ? 
              <button onClick={handleGoogleSignOut}>Sign Out</button>
              :
              <div>
                <button onClick={handleGoogleSignIn}>Google Sign in</button>
              <button onClick={handleGithubSignIn}>Github Sign In</button>
              </div>
            }
            <h2>User Name:{user.displayName}</h2>
            <h3>User Email: {user.email}</h3>
            <p>Profile Picture <br /> <img src={user.photoURL} alt="" /> </p>
            
        </div>
    );
};

export default PopUpGoogle;