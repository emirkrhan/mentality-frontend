import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Message from "../message/Message"
import "./chatbot.css"

// veritabanına kullanıcı id ve sohbet id kaydedilecek
// her sohbet id değiştiğinden farklı bir bağlam oluşturulacak

function Chatbot() {

  const {
    list,
    prompt,
    promptChange,
    getChatResponse,
    postOneMessage,
    setPrompt

  } = useContext(AppContext);

  const handleChatRequest = async () => {
    await postOneMessage(prompt); 
    await getChatResponse();
    setPrompt({
      id: 0,
      message: "",
      author: "user"
    })
  };
  
  

  return (
    <div className="bot-cont">
    <div className="chat-cont"></div>
    <div className="message-cont">
     <div className="mesajlar">
  {list.map((promptx, index) => (
    <Message key={index} message={promptx} />
  ))}
</div>
<div className="mesaj-bosluk"></div>
<div className="user-message-input">
<input
      
        id='message'
        name='message'
        type="text"
        value={prompt?.message}
        onChange={promptChange}
        placeholder="Bir şeyler yaz..."
        autoComplete="off"
      />
      <button onClick={handleChatRequest}>Gönder</button>
</div>

      
     
    </div>
    </div>
  )
}

export default Chatbot