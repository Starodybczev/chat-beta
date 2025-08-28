import React, { useState } from 'react'
import { db } from '../../fireBase/fireBase';
import {auth} from '../../fireBase/fireBase'
import '../../Styles/Registration.css'; 
import { Link } from 'react-router-dom';
import { addDoc, collection} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import createUserProfile from '../../constants/createUserProfile';


export default function Registration({user}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("")
    const [avatar , setAvatar] = useState("")


    const handleMail = async(e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: login,
            photoURL: avatar,
      });
        await createUserProfile({
            ...user,
            displayName:login,
            photoURL:avatar,
      })

    } catch (error) {
          alert("Error creating user: " + error.message);
    }
    finally{
        e.target.reset(); 
    }
    }
  return (
    <div className='registration'>
    <form className='formReg' onSubmit={handleMail}>
        <h2>Registration</h2>
        <input type="text" placeholder="name" required onChange={(e) => setLogin(e.target.value)}/>
        <input type="text" placeholder="email" required onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="image"  onChange={(e) => setAvatar(e.target.value)}/>
        <input type="text" placeholder="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button className='btnReg'>Registration</button>
    </form>

    <Link to="/sign-in">Sign In</Link>
    
    </div>
  )
}
