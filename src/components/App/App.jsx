import React, { useEffect } from 'react'
import Registration from '../Registration/Registration'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../fireBase/fireBase'
import { activeUser } from '../../reduxConfig/actions' 
import ChatApp from '../ChatApp/ChatApp';
import SignIn from '../SignIn/SignIn';


export default function App() {
      const navigate = useNavigate();
      const dispatch = useDispatch();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/chat-app");
      dispatch(activeUser(currentUser.uid, currentUser.email));
    } else {
      navigate("/");
    }
      });
    return unsubscribe;
}, [])

  return (
    <>
    <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/chat-app" element={<ChatApp />} />
        <Route path="/sign-in" element={<SignIn />} />
    </Routes>

        
    </>
  )
}
