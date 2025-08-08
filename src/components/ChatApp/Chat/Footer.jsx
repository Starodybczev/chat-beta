import React from 'react'
import '../../../Styles/ChatStyles/Footer.css'

export default function Footer() {
  return (
    <footer className='chatFooter'>
        <form className='chatForm'>
            <input type="text" placeholder='Type your message...' />
            <button>Send</button>
        </form>
    </footer>
  )
}
