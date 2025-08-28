import React, { useEffect, useState } from "react";
import "../../../Styles/ChatStyles/Header.css";
import { auth } from "../../../fireBase/fireBase";
import { signOut, updateProfile } from "firebase/auth";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../constants/firebaseConfig";
import { IoMdMore } from "react-icons/io";
import Modal from "../../../constants/Modal";

export default function Header({ user, selectedUser, group }) {
  const [openEditModalProfile, setOpenEditModalProfile] = useState(false);
  const [membersData, setMembersData] = useState([]);

  const [nameGroup, setNameGroup] = useState("");
  const [avatarGroupEdit, setAvatarGroupEdit] = useState(null);

  const EditGroupModalBlock = async (e) => {
    e.preventDefault();
    try {
      const groupRef = doc(db, "groups", selectedUser.id);
      await updateDoc(groupRef, {
        name: nameGroup,
        photo: avatarGroupEdit,
      });
      alert("good");
      setOpenEditModalProfile(false);
    } catch (error) {
      alert("error");
    } finally {
      e.target.reset();
    }
  };

  useEffect(() => {
    if (selectedUser?.members?.length) {
      const unsubscribers = selectedUser.members.map((uid) => {
        const ref = doc(db, "users", uid);
        return onSnapshot(ref, (snap) => {
          setMembersData((prev) => {
            const exists = prev.find((u) => u.uid === uid);
            const newUser = { uid, ...snap.data() };
            return exists
              ? prev.map((u) => (u.uid === uid ? newUser : u))
              : [...prev, newUser];
          });
        });
      });

      return () => unsubscribers.forEach((unsub) => unsub());
    }
  }, [selectedUser]);

  const handleLogout = async () => {
    try {
      // сначала ставим статус оффлайн
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        status: "offline",
        lastSeen: serverTimestamp(),
      });

      // потом делаем выход
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const formatLastSeen = (timestamp) => {
    if (!timestamp) return;

    const date = timestamp.toDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!selectedUser?.id) return;

    const groupRef = doc(db, "groups", selectedUser.id);

    const unsubscribe = onSnapshot(groupRef, async (snap) => {
      const groupData = snap.data();
      if (!groupData?.members?.length) {
        setMembersData([]);
        return;
      }

      // Получаем актуальные данные всех участников
      const usersData = [];
      for (const uid of groupData.members) {
        const userSnap = await getDoc(doc(db, "users", uid));
        usersData.push({ uid, ...userSnap.data() });
      }

      setMembersData(usersData);
    });

    return () => unsubscribe();
  }, [selectedUser?.id]);

  // Удаление участника
  const deleteUserFromGroup = async (id) => {
    try {
      const groupRef = doc(db, "groups", selectedUser.id);
      const updatedMembers = selectedUser.members.filter((uid) => uid !== id);

      if (updatedMembers.length === 0) {
        await deleteDoc(groupRef);
      } else {
        await updateDoc(groupRef, { members: updatedMembers });
      }
    } catch (err) {
      console.error("Ошибка при удалении участника:", err);
    }
  };

  const DelateGroup = () => {
    try {
      const groupRef = doc(db, "groups", selectedUser.id);
      deleteDoc(groupRef);
      setOpenEditModalProfile(false);
    } catch (error) {}
  };

  return (
    <header className="header">
      <img
        className="logo"
        src={selectedUser.photoURL || selectedUser.photo}
        alt=""
      />
      <div className="block">
        <h2 style={{ padding: "0", margin: "0" }}>
          {selectedUser.isGroup ? selectedUser.name : selectedUser.displayName}
        </h2>
        {!selectedUser.isGroup ? (
          <p
            style={{
              padding: "0",
              margin: "0",
              color: selectedUser.status === "online" ? "green" : "gray",
            }}
          >
            {selectedUser.status === "online"
              ? "онлайн"
              : `был(а): ${formatLastSeen(selectedUser.lastSeen)}`}
          </p>
        ) : null}
      </div>

      <div className="user">
        <button className="btnUot" onClick={handleLogout}>
          выйтия
        </button>
        <div title="more" style={{ padding: 10 }}>
          {selectedUser.isGroup ? (
            <IoMdMore
              onClick={() => setOpenEditModalProfile(true)}
              style={{ fontSize: 27, color: "white" }}
            />
          ) : null}
        </div>
      </div>
      {openEditModalProfile ? (
        <Modal
          active={openEditModalProfile}
          setActive={setOpenEditModalProfile}
        >
          <form className="formEditProfile" onSubmit={EditGroupModalBlock}>
            <input
              type="text"
              placeholder="name group"
              onChange={(e) => setNameGroup(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="avatar group"
              onChange={(e) => setAvatarGroupEdit(e.target.value)}
              required
            />
            <hr />
            <div className="btnBlock">
              <button className="EditBtn">edit</button>
              <button className="btnDelateGroup" onClick={DelateGroup}>
                dalete group
              </button>
            </div>
          </form>
          <div>
            <h4
              style={{ textAlign: "center", padding: "10px", color: "white" }}
            >
              Users
            </h4>
            {membersData.map((user) => (
              <div className="userEdit" key={user.uid}>
                <p className="nameParagraff">
                  {user.uid === auth.currentUser.uid ? (
                    <span className="nameParagraff">вы {user.displayName}</span>
                  ) : (
                    user.displayName
                  )}
                </p>

                {user.uid !== auth.currentUser.uid &&
                  selectedUser.isGroup &&
                  selectedUser.createdByAuthor === auth.currentUser.uid && (
                    <button
                      onClick={() => deleteUserFromGroup(user.uid)}
                      className="btnUot"
                    >
                      delete
                    </button>
                  )}
              </div>
            ))}
          </div>
        </Modal>
      ) : null}
    </header>
  );
}
