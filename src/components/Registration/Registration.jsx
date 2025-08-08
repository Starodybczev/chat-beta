import React, { useState } from 'react'
import { db } from '../../fireBase/fireBase';
import {auth} from '../../fireBase/fireBase'
import '../../Styles/Registration.css'; 
import { Link } from 'react-router-dom';
import { addDoc, collection} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleMail = async(e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        const userEmail = userCredential.user.email;
        await addDoc(collection(db, "DataMessage"), {
             email,
             password,
             owner: uid,
             ownerEmail: userEmail,
             createAt: new Date(),
        });

    } catch (error) {
        alert("Error creating user: " );
    }
    finally{
        e.target.reset(); 
    }
    }
  return (
    <div className='registration'>
    <form className='formReg' onSubmit={handleMail}>
        <h2>Registration</h2>
        <input type="text" placeholder="email" required onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="password" required onChange={(e) => setPassword(e.target.value)}/>
        <button>Registration</button>
    </form>

    <Link to="/sign-in">Sign In</Link>
    
    </div>
  )
}
