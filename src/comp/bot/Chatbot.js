import React, { useEffect, useContext, useState, useRef } from "react";
import AppContext from "../context/AppContext";
import Message from "../message/Message"
import "./chatbot.css"
import inappropriateWords from "./inappropriateWords";
import { useNavigate } from "react-router-dom";

function Chatbot() {

  const {
    list,
    prompt,
    promptChange,
    getChatResponse,
    getChatResponse2,
    postOneMessage,
    setPrompt,
    status,
    clearIng,
    loading,
    sayac,
    duygudr,
    chats,
    setChats,
    chatIds,
    setChatIds,
    chat,
    setChat,
    createOneChat,
    prompt2,
    setChatChange,
    feedback,
    setFeedback,
    createOneFeedback,
    putOneChat,
    clearChat
  } = useContext(AppContext);

  const reverseChat = chats.reverse();
  const [controlling, setControlling] = useState(0);
  const [startingDiv, setStartingDiv] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [profileDiv, setProfileDiv] = useState(false);
  const userId = parseInt(sessionStorage.getItem('userId'), 10);
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const filteredList = list.filter(item => item.messageChatId == chatIds);
    setFilteredMessages(filteredList);
  }, [list, chatIds]);


  useEffect(() => {
    sessionStorage.setItem('chatIdstorage', chatIds);
  }, [chatIds]);

  const profileDivFunc = () => {
    setProfileDiv(!profileDiv);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const userId = parseInt(sessionStorage.getItem('userId'), 10);

    if (isNaN(userId) || userId === null) {
      navigate('/login');
    } else {
      navigate(`/chat`);
    }
  }, []);

  const exitFunc = () => {
    if (!isNaN(userId)) {
      sessionStorage.removeItem('userId');
    } else {
      console.log('userId öğesi zaten bulunmuyor.');
    }
    navigate('/login');
  }

  const handleChatRequest = async () => {

    if (prompt.messageText.trim().length !== 0) {
      for (let i = 0; i < inappropriateWords.length; i++) {
        if (prompt.messageText.includes(inappropriateWords[i])) {
          setControlling(controlling + 1)
        }
      }

      await postOneMessage(prompt);
      getChatResponse2();
      setPrompt({
        messageId: 0,
        messageText: "",
        messageAuthor: "user",
        messageChatId: chatIds,
        messageUserId: userId
      });

      setTimeout(async () => {
        await getChatResponse();
      }, 500);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChatRequest();
    }
  };

  const backChatsScreen = () => {
    navigate("/chats");
  }

  const containerRef = useRef(null);

  useEffect(() => {

    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }

  }, [containerRef, list])

  const chatEndFunc = () => {
    const updatedChats = [...chats];
    const index = updatedChats.findIndex(chat => chat.chatId === chatIds);
    updatedChats[index] = {
      ...updatedChats[index],
      chatIsOpen: "false",
    };
    setChats(updatedChats);
    putOneChat();
    navigate("/chats")
    clearChat();
  }

  return (
    <div className="bot-cont">
      <div className="message-cont">
        <div ref={containerRef} className="mesajlar">
          {list
            .map((promptx, index) => (
              <Message key={index} message={promptx} index={index} list={list} feedback={feedback} setFeedback={setFeedback} createOneFeedback={createOneFeedback} />
            ))}
        </div>
        <div className="user-message-input">
          <button onClick={chatEndFunc}>Sohbeti Bitir</button>
          <div className="input-box">
            <textarea
              id='messageText'
              name='messageText'
              type="text"
              value={prompt?.messageText}
              onChange={promptChange}
              placeholder="Bir şeylerden bahset..."
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
            {loading ? <div class="loader"></div> : <button onClick={handleChatRequest}></button>}
          </div>
        </div>
      </div>
      {sayac === 5 ? <div className="black-box">
        <div className="white-box">Lütfen konuşmanın gidişatını değiştirecek ifadeler kullanmayın. Terapinin akışını bozacak ifadelere yer vermeniz halinde terapi yarıda kesilecektir.</div>
      </div> : ""}
    </div>
  )
}

export default Chatbot