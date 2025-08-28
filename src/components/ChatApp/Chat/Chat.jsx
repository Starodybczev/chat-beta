import React from "react";
import "../../../Styles/ChatStyles/Header.css";
import Main from "./Main";

export default function Chat({ selectedUser, setSelectedUser }) {
  return (
    <div className="chat">
      <Main selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
    </div>
  );
}
