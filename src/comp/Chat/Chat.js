import React from 'react'
import "./chat.css"
import { useNavigate } from 'react-router-dom';

function Chat({ chat, list, chatIds, setChatIds, setChatChange, index, chats, postOneMessage, prompt2 }) {

    var suAnkiTarih = new Date();
    const navigate = useNavigate();
    var tarihFormati = { year: 'numeric', month: 'long', day: 'numeric' };
    var tarihString = suAnkiTarih.toLocaleDateString('tr-TR', tarihFormati);

    const chatFunc = () => {
        setChatIds(chat.chatId);
    }

    const openChatFunc = () => {
        setChatIds(chat.chatId)
        if (list.length == 0) {
            postOneMessage(prompt2);
        }
        navigate("/chat")
    }

    return (
        <div className={chat.chatIsOpen == "true" ? 'con-chatting' : 'chat-btn'}>
            {chat.chatIsOpen === "true" ? <div className='continued-div'><i class="fa-solid fa-circle fa-fade"></i></div> : <div className='completed-div'><i class="fa-solid fa-circle"></i></div>}
            <div className='chat-information'>
                <div className="chat-name">{chat.chatName}</div>
                <div className="chat-date">{tarihString}</div>
            </div>
            <div className="chat-buttons">
                {chat.chatIsOpen === "true" ? <div className="chat-buttonone"></div> : <div className="chat-buttonone"><button><i class="fa-regular fa-file-lines"></i></button></div>}
                {chat.chatIsOpen === "true" ? <div className="chat-buttontwo"><button onClick={openChatFunc} className='pink-button'>Devam Et</button></div> : <div className="chat-buttontwo"><button className='history-button'>Sohbeti Gör</button></div>}

            </div>
        </div>
    )
}

export default Chat