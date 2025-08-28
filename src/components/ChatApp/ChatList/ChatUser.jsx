import { collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../fireBase/fireBase";
import { orderBy } from "firebase/firestore";
import "../../../Styles/ChatStyles/ChatList.css";
import ChatMenu from "../../ChatMenu/ChatMenu";
import { useDispatch } from "react-redux";
import ChatGroup from "../../../constants/ChatGroup";
import Main from "../Chat/Main";

export default function ChatUser({
  user,
  selectedUser,
  setModalActive,
  searchName,
}) {
  const [users, setUsers] = useState([]);
  const [curentUser, setCurentUser] = useState(null);
  const [lastMessages, setLastMessages] = useState({});

  const [ModalCreate, setModalCreate] = useState(false);

  const [activeId, setActiveId] = useState(null);
  const [group, setGroup] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurentUser(user.uid);
      }
    });

    const q = query(collection(db, "users"), orderBy("displayName"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const allUsers = snap.docs.map((doc) => doc.data());
      setUsers(allUsers);
    });
    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const unsubs = [];

    users.forEach((user) => {
      if (user.uid === curentUser) return;

      const ChatId = [curentUser, user.uid].sort().join("_");
      const qurry = query(
        collection(db, "chat", ChatId, "messages"),
        orderBy("createAt", "desc"),
        limit(1)
      );

      const unsub = onSnapshot(qurry, (snap) => {
        if (!snap.empty) {
          const msg = snap.docs[0].data();
          setLastMessages((prev) => ({
            ...prev,
            [user.uid]: msg,
          }));
        }
      });

      unsubs.push(unsub);
    });

    return () => unsubs.forEach((item) => item());
  }, [users, curentUser]);

  useEffect(() => {
    if (!curentUser) return;
    const qurryDoc = query(
      collection(db, "groups"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(qurryDoc, (snap) => {
      const allGroups = snap.docs
        .map((doc) => doc.data())
        .filter((group) => group.members.includes(curentUser));
      setGroup(allGroups);
    });
    return () => unsub;
  }, [curentUser]);

  const filteredUser = curentUser
    ? users.filter(
        (user) =>
          user.uid !== curentUser &&
          user.displayName.toLowerCase().includes(searchName.toLowerCase())
      )
    : users;

  const filteredGroups = group.filter((g) =>
    g.name.toLowerCase().includes(searchName.toLowerCase())
  );

  //? map
  return (
    <div className="div_class">
      <ChatGroup
        ModalCreate={ModalCreate}
        setModalCreate={setModalCreate}
        filteredUser={filteredUser}
        curentUser={curentUser}
      />
      <div style={{ display: "none" }}>
        <Main group={group} />
      </div>
      <ChatMenu
        setModalCreate={setModalCreate}
        setModalActive={setModalActive}
      />
      <div className="userBlock">
        {filteredGroups.map((group, index) => {
          const isActive = activeId === `group_${group.uid}_${index}`;

          return (
            <div
              key={`group_${group.uid}_${index}`}
              className={`groupBlock__Main ${isActive ? "active" : ""}`}
              onClick={() => {
                setActiveId(`group_${group.uid}_${index}`);
                selectedUser({ ...group, isGroup: true });
              }}
            >
              <img className="profile" src={group.photo} alt="" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 0,
                  padding: 0,
                  alignItems: "center",
                }}
              >
                <p className="paragrraff">{group.name}</p>
                <p className="paragrraff">Group</p>
              </div>
            </div>
          );
        })}

        {filteredUser.length
          ? filteredUser.map((user) => {
              const lastMsg = lastMessages[user.uid];

              return (
                <div
                  className={`massageBlockId ${
                    activeId === user.uid ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveId(user.uid);
                    selectedUser(user);
                  }}
                  key={user.uid}
                >
                  <img className="profile" src={user.photoURL} alt="" />
                  <div>
                    <p>{user.displayName}</p>
                    <p className="paragraff">
                      {lastMsg ? lastMsg.text : "Нет сообщений"}
                    </p>
                  </div>
                </div>
              );
            })
          : "подождите......"}

        <div
          style={{
            position: "absolute",
            left: "10px",
            bottom: "0px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <p> добро Пожаловать: </p>
          <img
            className="profile"
            src={auth.currentUser ? user.photoURL : "Загрузка..."}
            alt=""
          />
          <p style={{ fontWeight: "bold" }}>
            {auth.currentUser ? auth.currentUser.displayName : "Загрузка..."}
          </p>
        </div>
      </div>
    </div>
  );
}
