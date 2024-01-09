import React, { useState } from 'react'
import "./message.css"

function Message({ index, message, list, feedback, setFeedback, createOneFeedback }) {

  const [feedbackDiv, setFeedbackDiv] = useState(false);

  const closeFeedbackDiv = () => {
    setFeedbackDiv(false);

  }

  const sendFeedback = () => {
    createOneFeedback(feedback);
    setFeedbackDiv(false)
  }

  const feedbackChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value
    });
  }

  const editFeedBack = (value) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      feedbackType: value
    }));
    setFeedbackDiv(true)
  }



  return (
    <div className="message-container">
      <div className="profile-pic">
        <div className={message.messageAuthor.substring(0, 1).toUpperCase() === "U" ? "user-photos" : "mentality-photos"}> </div>
        {message.messageAuthor === "user" ? "You" : "Mentality"}
      </div>
      <div className='message-view'>{message.messageText}</div>
      {message.messageAuthor == "assistant" && index === list.length - 1 ? <div className='report-div'>
        <button onClick={() => editFeedBack(1)}><i class="fa-regular fa-face-smile"></i></button>
        <button onClick={() => editFeedBack(2)}><i class="fa-regular fa-face-frown-open"></i></button>
        <button onClick={() => editFeedBack(3)}><i class="fa-regular fa-flag"></i></button>
      </div> : ""}

      {feedbackDiv ? <div className='feedback-div'>
        <input type="text" id='feedbackComment' name='feedbackComment' onChange={feedbackChange} value={feedback.feedbackComment} placeholder='Görüşlerinizi giriniz!' />
        <button onClick={sendFeedback}>Gönder</button>
        <button onClick={closeFeedbackDiv}>Çık</button>
      </div> : ""}

    </div>

  )
}

export default Message