import React from "react";
import "../../../Styles/ChatStyles/ChatList.css";
import ChatCategory from "./ChatCategory";
import ChatUser from "./ChatUser";

export default function ChatList({
  user,
  selectedUser,
  setModalActive,
  setSearchName,
  searchName,
}) {
  return (
    <article className="chatList">
      <h2>Chat List</h2>
      <ChatCategory
        setSearchName={setSearchName}
        user={user}
        selectedUser={selectedUser}
      />
      <ChatUser
        searchName={searchName}
        setModalActive={setModalActive}
        selectedUser={selectedUser}
        user={user}
      />
    </article>
  );
}
