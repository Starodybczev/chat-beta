import React from 'react'
import '../../../Styles/ChatStyles/ChatList.css'
import ChatCategory from './ChatCategory'
import ChatUser from './ChatUser'
import Main from '../Chat/Main'

export default function ChatList() {
  return (

    <article className='chatList'>
        <h2>Chat List</h2>
        <ChatCategory/>
        <ChatUser/>

    </article>

  )
}
