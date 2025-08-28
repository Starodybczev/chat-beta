import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../fireBase/fireBase";
import "../../Styles/Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleMailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const useRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        useRef,
        {
          status: "online",
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
      navigate("/chat-app");
    } catch (error) {
      alert("Error signing in user: ");
    } finally {
      e.target.reset();
    }
  };

  return (
    <div className="signIn">
      <form className="forSignIn" onSubmit={handleMailSignIn}>
        <h2>SignIn</h2>
        <input
          type="text"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btnReg">Registration</button>
      </form>
      <Link to="/">Registration</Link>
    </div>
  );
}
