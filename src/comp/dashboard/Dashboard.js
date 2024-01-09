import React from 'react'
import "./dashboard.css"
import AppContext from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Chat from '../Chat/Chat';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const {
        list,
        postOneMessage,
        chats,
        chatIds,
        setChatIds,
        chat,
        setChat,
        createOneChat,
        prompt2,
        setChatChange,
        getAllChats

    } = useContext(AppContext);
    const navigate = useNavigate();
    const userId = parseInt(sessionStorage.getItem('userId'), 10);

    const exitFunc = () => {
        if (!isNaN(userId)) {
            sessionStorage.removeItem('userId');
        } else {
            console.log('userId öğesi zaten bulunmuyor.');
        }
        navigate('/login');
    }

    useEffect(() => {
        getAllChats(userId);
    }, [userId]);

    const userName = sessionStorage.getItem('userName');
    const name = userName?.split(' ')[0];

    const data = [6, 7, 8, 1, 4, 3, 8, 4];
    const [isHovering, setIsHovering] = useState(null);
    const [startNewChat, setStartNewChat] = useState(false);
    const [otherChat, setOtherChat] = useState(false);

    const handleMouseEnter = (index) => {
        setIsHovering(index);
    };

    const handleMouseLeave = () => {
        setIsHovering(null);
    };

    useEffect(() => {
        const userId = parseInt(sessionStorage.getItem('userId'), 10);
        if (isNaN(userId) || userId === null) {
            navigate('/login');
        } else {
            navigate(`/chats`);
        }
    }, []);



    const createNewChatFunc = () => {
        const isOpenChat = chats.find(chat => chat.chatIsOpen === "true");
        if (isOpenChat) {
            setOtherChat(true);
        } else {
            setStartNewChat(true)
        }
    }

    const createOneChatx = () => {
        createOneChat(chat);
        setStartNewChat(false)
    }

    const chatNameChange = (e) => {
        setChat({
            ...chat,
            [e.target.name]: e.target.value
        });
    }

    const endOtherChatFunc = () => {
        setOtherChat(false);
    };

    return (
        <div className='dashboard-container'>
            <nav className='state-navbar'>
                <div className="navbar-logo"></div>
                <div className="navbar-tag"><div className="active-tag"><i class="fa-regular fa-comments"></i></div></div>
                <div className="navbar-tag"><i class="fa-regular fa-note-sticky"></i></div>
                <div className="navbar-tag" onClick={exitFunc}><i class="fa-regular fa-user"></i></div>
            </nav>
            <div className="chat-dashboard">
                <div className="restrictive-div">
                    <div className='profile-dashboard'>
                        <div className="welcome-message">
                            <div className='hello-user'>Merhaba, {name}!</div>
                            <div className='inform-div'>Bugün kendini nasıl hissediyorsun?</div>
                        </div>
                        <div className="profile-section">
                            <div className='notification-div'>
                                <div className="notification-circle">
                                    <i class="fa-regular fa-bell"></i>
                                </div>
                            </div>
                            <div className='profile-view'>
                                <div className="profile-circle"></div>
                            </div>
                        </div>
                    </div>
                    <div className='info-dashboard'>
                        <div className="user-chats">
                            <div className="listed-information">
                                <div className='listed-text'>
                                    <div className="first-info">Terapilerim</div>
                                    <div className="second-info">Tüm terapiler ve istatistikler</div>
                                </div>
                                <div className="listed-new-chat-button">
                                    <button onClick={createNewChatFunc}><i class="fa-solid fa-comment"></i></button>
                                </div>
                            </div>
                            <div className="listed-chat">
                                {chats.slice().reverse().map((chat, index) => (
                                    <Chat key={index}
                                        chat={chat}
                                        setChatIds={setChatIds}
                                        chatIds={chatIds}
                                        setChatChange={setChatChange}
                                        index={index}
                                        chats={chats}
                                        postOneMessage={postOneMessage}
                                        prompt2={prompt2}
                                        list={list}
                                    />

                                ))}
                            </div>

                        </div>
                        <div className="graphic-view">
                            <div className="bar-chart"></div>

                            <div className='line-chart'>
                                <div className="line-info">
                                    <div className="line-title">Duygu Durum Grafiği</div>
                                    <div className="line-slogan">Duygu durumunu grafikte gör</div>
                                </div>
                                <div className="line-minidiv">
                                    <div className="minitwo">
                                        <div className="border-dashed">
                                            <div className="dashed-one"></div>
                                            <div className="dashed-two"></div>
                                            <div className="dashed-three"></div>
                                            <div className="dashed-four"></div>
                                        </div>
                                        {data.map((value, index) => (
                                            <div className='chart-elemans'
                                                key={index}

                                                style={{
                                                    height: `${value * (3.25 / 2)}rem`,
                                                    width: '25px',
                                                    backgroundColor: isHovering === index ? '#9350ff' : '#e1d0fc',
                                                    borderTopLeftRadius: '7px',
                                                    borderTopRightRadius: '7px',
                                                    transition: '0.5s',
                                                    zIndex: '99',
                                                    position: 'relative'


                                                }}
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}

                                            >
                                                {isHovering === index && value <= 7 ? <div className="data-gloss">{value}</div> : ""}
                                                {isHovering === index && value > 7 ? <div className="data-right-gloss">{value}</div> : ""}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="line-dates">
                                    <div className="dates-mapping">
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                        <div className="dates-view">7AR</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {startNewChat ? <div className='start-new-chat-container'>
                <div className="new-chat-div">
                    <input id='chatName' name='chatName' value={chat.chatName} onChange={chatNameChange} type="text" />
                    <button onClick={createOneChatx}>Oluştur</button>
                </div>
            </div> : ""}

            {otherChat ? <div className='start-new-chat-container'>
                <div className="new-chat-div">
                    <div>Lütfen önce geçerli terapiyi tamamlayın veya bitirin.</div>
                    <button onClick={endOtherChatFunc}>Tamam</button>
                </div>
            </div> : ""}
        </div>
    )
}

export default Dashboard



