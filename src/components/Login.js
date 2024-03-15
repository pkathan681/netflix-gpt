import React from 'react'
import Header from './Header'
import { useState,useRef } from 'react';
import { checkValidData}from "../utils/validate"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const[errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);
    const handleButtonClick = () => {
        const message = checkValidData(email.current.value,password.current.value)
        setErrorMessage(message);
        if(message) return;

        if(!isSignInForm){
                // Sign Up Logic
                createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid,email:email,displayName:displayName,photoURL:photoURL}));
      navigate("/browse");

    }).catch((error) => {
      setErrorMessage(error.message);
    });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
    // ..
  });

        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });


        }
    };
    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm); 
        

    };
  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="logo"
      />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&<input ref={name} type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700"/>}

        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700"/>
       
        <input ref={password} type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700"/>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In now."}</p>
      </form>
    </div>
  )
}

export default Login
