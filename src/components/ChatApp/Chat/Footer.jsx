import React from 'react'
import '../../../Styles/ChatStyles/Footer.css'
import '../../../Styles/ChatStyles/Main.css'


export default function Footer() {
  return (
    <footer className='chatFooter'>
        <form className='chatForm'>
            <input type="text" placeholder='Type your message...' />
        </form>
    </footer>
  )
}
