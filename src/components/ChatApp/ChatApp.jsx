import React, { useState } from "react";
import ChatList from "./ChatList/ChatList";
import Chat from "./Chat/Chat";
import "../../Styles/ChatStyles/ChatApp.css";
import Modal from "../../constants/Modal";
import { updateProfile } from "firebase/auth";

export default function ChatApp({ user }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [curentUser, setCurentUser] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [searchName, setSearchName] = useState("");

  const handleEdite = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: image,
      });
      setModalActive(false);
    } catch (error) {
      alert("ошибка");
    } finally {
      e.target.reset();
    }
  };

  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive}>
        <form className="formEdit" onSubmit={handleEdite}>
          <hr />
          <h2>Редактирование </h2>
          <input
            type="text"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="image"
            onChange={(e) => setImage(e.target.value)}
          />
          <button className="btnEdit">text</button>
        </form>
        <br />
        <hr></hr>
        <h2>Смена Темы </h2>
        <div className="ThemColor"></div>
      </Modal>

      <div className="chatContainer">
        <Chat
          user={user}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <ChatList
        searchName={searchName}
        setSearchName={setSearchName}
        setModalActive={setModalActive}
        selectedUser={(item) => setSelectedUser(item)}
        setSelectedUser={setSelectedUser}
        user={user}
      />
    </div>
  );
}
