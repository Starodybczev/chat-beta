import React from 'react'
import ChatList from './ChatList/ChatList'
import Chat from '../ChatApp/Chat/Chat'
import '../../Styles/ChatStyles/ChatApp.css'


export default function ChatApp() {
  return (
    <div>
      <div className='chatContainer'>
            <Chat/>
      </div>
        <ChatList/>
    </div>
  )
}
