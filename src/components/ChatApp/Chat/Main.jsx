import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../../../Styles/ChatStyles/Main.css";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../fireBase/fireBase";
import ChooseUser from "../../../constants/ChooseUser";

export default function Main({ user, selectedUser, setSelectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState();

  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    let unsub; // общая переменная для отписки

    if (selectedUser.isGroup) {
      const q = query(
        collection(db, "groups", selectedUser.id, "messages"),
        orderBy("createdAt", "asc")
      );

      unsub = onSnapshot(q, (snap) => {
        setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsub();
    } else {
      const ChatId = [auth.currentUser.uid, selectedUser.uid].sort().join("_");

      const q = query(
        collection(db, "chat", ChatId, "messages"),
        orderBy("createAt", "asc") // <-- у тебя тут "createAt", а в group — "createdAt"
      );

      unsub = onSnapshot(q, (snap) => {
        setMessages(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }

    return () => unsub();
  }, [selectedUser]);

  const sendMessages = async (e) => {
    e.preventDefault();
    try {
      if (!text.trim() || !selectedUser || !auth.currentUser) return;
      if (selectedUser.isGroup) {
        await addDoc(collection(db, "groups", selectedUser.id, "messages"), {
          text,
          sender: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
      } else {
        const ChatId = [auth.currentUser.uid, selectedUser.uid]
          .sort()
          .join("_");
        await addDoc(collection(db, "chat", ChatId, "messages"), {
          text,
          sender: auth.currentUser.uid,
          resevier: selectedUser.uid,
          createAt: serverTimestamp(),
          chatId: ChatId,
        });
      }
    } catch (error) {
    } finally {
      e.target.reset();
    }
  };

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return;

    const date = timestamp.toDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const massagesData = messages.map((msg, i) => {
    return (
      <div
        className="messagesContainer"
        key={i}
        style={{
          textAlign: msg.sender === auth.currentUser.uid ? "right" : "left",
          marginBottom: "10px",
          flex: 1,
        }}
      >
        <span
          className={`message-bubble ${
            msg.sender === auth.currentUser.uid ? "sent" : "received"
          }`}
        >
          <p className="message-sender">
            {msg.sender === auth.currentUser?.uid
              ? auth.currentUser?.displayName || "You"
              : selectedUser?.displayName || "Unknown"}
          </p>
          <hr />
          <p className="message-text">{msg.text}</p>
          <p className="message-time">{formatLastSeen(msg.createAt)}</p>
        </span>
      </div>
    );
  });

  if (!selectedUser) {
    return <ChooseUser />;
  }

  return (
    <main className="main">
      <Header user={user} selectedUser={selectedUser} />

      <div style={{ flex: 1, overflowY: "auto", padding: "150px 30px" }}>
        {massagesData}
      </div>

      <footer className="chatFooter">
        <form onSubmit={sendMessages} className="chatForm">
          <button type="button" className="emojiButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="36"
              height="36"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4a8 8 0 100 16 8 8 0 000-16zm-3 7h.01M15 11h.01M9 15c1.5 1 4.5 1 6 0"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            onChange={(e) => setText(e.target.value)}
            required
          />
        </form>
      </footer>
    </main>
  );
}
