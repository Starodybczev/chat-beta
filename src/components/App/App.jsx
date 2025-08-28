import React, { useEffect, useState } from "react";
import Registration from "../Registration/Registration";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fireBase/fireBase";
import { activeUser } from "../../reduxConfig/actions";
import ChatApp from "../ChatApp/ChatApp";
import SignIn from "../SignIn/SignIn";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../constants/firebaseConfig";

export default function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const useRef = doc(db, "users", user.uid);
        const snap = await getDoc(useRef);
        if (snap.exists()) {
          await updateDoc(useRef, {
            status: "online",
            lastSeen: serverTimestamp(),
          });
        } else {
          console.log("document not find");
        }
      } else {
        setUser(null);
      }
    });
  }, []);

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
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Registration user={user} />} />
        <Route path="/chat-app" element={<ChatApp user={user} />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}
