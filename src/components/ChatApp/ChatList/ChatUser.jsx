import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../fireBase/fireBase';
import { orderBy } from 'firebase/firestore';
import '../../../Styles/ChatStyles/ChatList.css'

export default function ChatUser() {
    const [userData, setUserData] = useState([]);




useEffect(() => {
  getData();


}, [])


const getData = async () => {
  try {
    const q =  query(collection(db, "DataMessage") , orderBy("createAt", "desc"));
    const unsubscribe =  onSnapshot(q, (snapshot) => {
      const itemData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUserData(itemData);
    })
  } catch (error) {
    
  }
}




  return (
    <div>
        <h3>Chat User</h3>
        {userData.map(({id, ownerEmail,  }) => (
            <div className='chatUser' key={id}>
              <div className='profile'></div>
                <h4>{ownerEmail}</h4>
              </div>  
          ))}
   
    </div>
 
  )
}
