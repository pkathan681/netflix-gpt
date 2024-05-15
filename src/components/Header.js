import { onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { addUser , removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      navigate("/");
    })
    .catch((error)=>{
      navigate("/error");
    });
  };
  
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center flex justify-between">
        <img
          className="w-44"
          src={LOGO}
          alt="logo"
        />
        {user &&(<div className="flex p-2">
          <img className="w-12 h-12 " alt="usericon" src={user?.photoURL}/>
          <button onClick={handleSignOut} className="font-bold text-white" > (Sign Out) </button>
      </div>
)}
    </div>
  );
};

export default Header;
