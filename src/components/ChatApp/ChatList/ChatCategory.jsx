import React from "react";
import "../../../Styles/ChatStyles/ChatCategory.css";

export default function ChatCategory({
  selectedUser,
  user,
  setSearchName,
  searchName,
}) {
  return (
    <div className="chatCategory">
      <input
        type="text"
        placeholder="Search chats"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </div>
  );
}
