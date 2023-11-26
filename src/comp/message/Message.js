import React from 'react'
import "./message.css"

function Message({message}) {
  return (
    <div className="message-container">
      <div className="profile-pic">
        <div className={message.author.substring(0, 1).toUpperCase() === "U" ? "user-photos" : "mentality-photos"}> </div>
        {message.author === "user" ? "You" : "Mentality"}
        </div>
      <div className='message-view'>{message.message}</div>

    </div>
   
  )
}

export default Message