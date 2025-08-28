import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from './firebaseConfig'
import "../Styles/ChatStyles/Main.css"
import Modal from './Modal'
import {Input} from "reactstrap"



export default function ChatGroup({filteredUser, curentUser, setModalCreate, ModalCreate}) {
    const [groupName, setGroupName] = useState("")
    const [selectedMembers, setSelectedMembers] = useState([])
  

    const toggleMember = (uid) => {
        setSelectedMembers((prev) => prev.includes(uid) ? prev.filter(item => item !== uid) : [...prev, uid])
    }

    const createGroup = async() => {
        if(!groupName.trim() || selectedMembers.length === 0) return
        const grouRef = doc(collection(db, "groups"))
        await setDoc(grouRef, {
            id: grouRef.id,
            name: groupName,
            photo: "https://static.vecteezy.com/system/resources/previews/019/989/674/non_2x/group-people-icon-sign-symbol-graphic-illustration-vector.jpg",
            members: [curentUser, ...selectedMembers],
            createdAt: serverTimestamp(),
            createdByAuthor: curentUser,
        })
        
        setGroupName("")
        setSelectedMembers([])

    }
  return (
    <Modal active={ModalCreate} setActive={setModalCreate}>
        <input type='text' placeholder='name group' value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
        <h4>Select User</h4>
        {filteredUser.map((item) => {
            return(
                <div className='modalGroup' key={item.uid}>
                    <Input className='checked' type='checkbox'onChange={() => toggleMember(item.uid)} checked={selectedMembers.includes(item.uid)}/>
                    <span>{item.displayName}</span>
                </div>
            )
        })}
        <button onClick={createGroup}>create group</button>
    </Modal>
  )
}
