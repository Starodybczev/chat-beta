import React, { useState } from 'react'
import '../../../Styles/ChatStyles/ChatCategory.css'

export default function ChatCategory() {
    const [searchTerm, setSearchTerm] = useState('');

    const SearchChat =  async(e) => {
    e.preventDefault();
    }
  return (
    <form className='chatCategory' onSubmit={SearchChat}>
        <input type="text" placeholder="Search chats" onChange={(e) => setSearchTerm(e.target.value)}/>
    </form>
  )
}
