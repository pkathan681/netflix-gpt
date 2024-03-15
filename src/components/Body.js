import React from 'react'
import Browse from './Browse'
import Login from './Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { addUser,removeUser } from '../utils/userSlice'
const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        }
    ])
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user;
          dispatch(addUser({uid: uid,email:email,displayName:displayName,photoURL:photoURL}));
        } else {
          dispatch(removeUser());
        }
      });

    },[])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
