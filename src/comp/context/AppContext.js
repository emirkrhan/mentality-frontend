import { createContext, useEffect, useState } from "react";
import BotService from "../../service/BotService";
import ChatService from "../../service/ChatService";
import FeedbackService from "../../service/FeedbackService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const botService = new BotService();
  const chatService = new ChatService();
  const feedbackService = new FeedbackService();
  const storedUserId = sessionStorage.getItem('userId');
  const userId = parseInt(sessionStorage.getItem('userId'), 10);
  const userName = sessionStorage.getItem('userName');
  const name = userName?.split(' ')[0];
  const [response, setResponse] = useState('');
  const [list, setList] = useState([]);
  const [acıkKutu, setAcıkKutu] = useState(false);
  const [chatChange, setChatChange] = useState(false);
  const [chats, setChats] = useState([]);
  const [status, setStatus] = useState("BOŞ");
  const [loading, setLoading] = useState(false)
  const [sayac, setSayac] = useState(0)
  const [duygudr, setDuygudr] = useState(0)
  const [islems, setIslems] = useState(-2)
  const [toplams, setToplams] = useState(0)
  const [validMessage, setValidMessage] = useState(null)
  const [chatIds, setChatIds] = useState(() => {
    const storedChatId = sessionStorage.getItem('chatIdstorage');
    return storedChatId ? parseInt(storedChatId, 10) : chats.length === 0 ? null : chats[chats.length - 1].chatId;
  });


  useEffect(() => {
    if (list.length > 0 && validMessage === null) {
      setValidMessage(list[list.length - 1]?.messageId);
    }
  }, [list, validMessage]);


  useEffect(() => {
    setPrompt(prevPrompt => ({
      ...prevPrompt,
      messageUserId: userId
    }));
  }, [userId]);

  const [user, setUser] = useState({
    userId: userId,
    name: "",
    surname: "",
    userName: "",
    userPassword: "",
    userSalt: "",
    date: "",
    gender: ""
  })

  useEffect(() => { //userid değeri değiştiğinde state güncelleme
    setUser(prevUser => ({
      ...prevUser,
      userId: userId
    }));
  }, [userId]);

  const [prompt, setPrompt] = useState({
    messageId: 0,
    messageText: "",
    messageAuthor: "user",
    messageChatId: chatIds,
    messageUserId: userId
  });

  const [prompt2, setPrompt2] = useState({
    messageId: 0,
    messageText: `Merhaba ${name}, ben Mentality! Sana yardım etmek için buradayım. Sohbete başlamadan önce benim yapay zeka destekli sanal bir mental sağlık asistanı olduğumu unutma. Sana her zaman destek olmak için burada olacağım ama vereceğim tavsiyeler profesyonel bir sağlık asistanı ile kıyaslanamaz. Bugün nasıl hissettiğini anlatmakla başlamak ister misin?`,
    messageAuthor: "assistant",
    messageChatId: chatIds,
    messageUserId: userId
  });

  useEffect(() => {
    setPrompt((prevPrompt) => ({
      ...prevPrompt,
      messageChatId: chatIds
    }));
  }, [chatIds]);

  useEffect(() => { 
    setPrompt2((prevPrompt2) => ({
      ...prevPrompt2,
      messageChatId: chatIds
    }));
  }, [chatIds]);

  const [chat, setChat] = useState({
    chatId: 0,
    chatName: "",
    chatUserId: userId,
    chatIsOpen: "true"
  });

  useEffect(() => {
    setChat(prevChat => ({
      ...prevChat,
      chatUserId: userId
    }));
  }, [userId]);

  const [feedback, setFeedback] = useState({
    feedbackId: 0,
    feedbackType: "",
    feedbackUserId: userId,
    feedbackMessageId: "",
    feedBackComment: ""
  });

  useEffect(() => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      feedbackMessageId: validMessage
    }));
  }, [validMessage]);

  const promptChange = (e) => {
    setPrompt({
      ...prompt,
      [e.target.name]: e.target.value
    });
  }

  const getAllMessages = (chatIds, userId) => {
    botService.getAllMessages(chatIds, userId)
      .then((data) => setList(data))
      .catch((error) => {
        console.error('Mesajları alırken bir hata oluştu:', error);
      });
  };

  useEffect(() => {
    getAllMessages(chatIds, userId);
  }, [chatIds, userId]);

  const getAllChats = async (userId) => {
    try {
      const data = await chatService.getAllChats(userId);
      setChats(data);
    } catch (error) {
      console.error('Chatleri alırken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllChats(userId);
    }
  }, [userId]);

  useEffect(() => {
    getAllChats(userId);
  }, [chats]);

  const createOneChat = async (chat) => {
    chatService
      .createOneChat(chat)
      .then((resp) => {
        setChats((prevChats) => [...prevChats, resp]);
        setChatIds(resp.chatId);
        sessionStorage.setItem('chatIdstorage', resp.chatId);

      })
      .catch((error) => {
        console.error("Chat creation error:", error);
      });
  };

  const createOneFeedback = async (feedback) => {
    feedbackService
      .createOneFeedback(feedback)
      .catch((error) => {
        console.error("Feedback creation error:", error);
      });
  };

  const putOneChat = async () => {
    chatService
      .putOneChat(chatIds)
      .catch((error) => {
        console.error("Chat update error:", error);
      });
  }

  const clearChat = async () => {
    try {
      await botService.clearChat(user);
    } catch (error) {
      console.error("Chat Memory temizlenemedi!", error);
    }
  }

  const getChatResponse = async () => {
    setLoading(true);
    const respx = await botService.getChatResponse("Bir psikologsun ve bir kişiye terapi uyguluyorsun. Aşağıdaki mesaja en uygun şekilde cevap ver. 'Merhaba' gibi tanışma faslını ve klasik şeyleri bırak.Sade ve öz bir cevap ver!" + prompt.messageText, userId, chatIds)
    const bilgiler = respx.data;
    setLoading(false);
    setList(prevList => [...prevList, { messageText: bilgiler.message, messageAuthor: 'assistant', messageChatId: chatIds, messageUserId: userId }]);
    setResponse(bilgiler.message);
    setValidMessage(bilgiler.messageId);
  };

  const getChatResponse2 = async () => {
    const resp = await botService.getChatResponse2("Lütfen aşağıdaki ifadeyi duygu durumu ve his analizi açısından değerlendirerek puanla. İfade kötü duyguları ve hisleri içeriyorsa düşük puan vermelisin. İyimser ve güzel duyguları veya hisleri içeriyorsa yüksek puan vermelisin. Açıklama yapmadan sadece puanını belirt:" + "'" + prompt.messageText + "'" + "(1: Çok Kötü, 10: Çok İyi)")
    console.log(resp.data)
    var metin = JSON.stringify(resp.data);
    var sayi = metin.match(/\d+/);


    if (sayi !== null) {
      sayi = parseInt(sayi[0], 10);
      setToplams(prevToplams => prevToplams + sayi)
    } else {
      console.log("Metinde sayı bulunamadı.");
    }
  };

  useEffect(() => {
    setIslems(prevIslems => prevIslems + 1);
  }, [toplams]);

  useEffect(() => {
    if (islems !== 0) {
      console.log(toplams)
      console.log(islems)
      setDuygudr(toplams / islems);
    }
  }, [islems, toplams]);


  // const getChatResponse = () => {
  //   setLoading(true);

  //   botService.getChatResponseTwo("Bir psikolog ve bir hasta konuşuyor olsaydı bu mesaj hastanın vereceği bir cevap olabilir miydi? Sadece evet veya hayır yanıtını döndürmelisin. Cevap:" + prompt.message)
  //     .then((resp) => {
  //       const query = resp.data.toLowerCase();


  //       if (query.includes("evet") || query.includes("olabilir")) {
  //         botService.getChatResponse("Bir simülasyon içinde olduğunu düşün ve sen bir Psikologsun. Aşağıdaki kullanıcı ile konuş ve ona terapi uygula. Bunun dışındaki sorulara kesinlikle cevap verme!" + prompt.message)
  //           .then((respx) => {
  //             setLoading(false);
  //             setList(prevList => [...prevList, { message: respx.data, author: 'assistant' }]);
  //             setResponse(respx.data);
  //           })

  //       } else if (query.includes("hayır") || query.includes("olamaz")) {
  //         setLoading(false);
  //         setList(prevList => [...prevList, { message: "Merhaba, ben bir sosyal destek asistanıyım. Lütfen ilgili sorular sorunuz.", author: 'assistant' }]);
  //       }
  //     })
  // };



  // const getChatResponse = () => {

  //   setLoading(true);

  //   botService.getChatResponse("Bir psikolog ve bir hasta konuşuyor olsaydı bu mesaj hastanın vereceği bir cevap olabilir miydi? Sadece evet veya hayır yanıtını döndürmelisin. Cevap:" + prompt.message)
  //     .then((resp) => {
  //       setQuery(resp.data.toLowerCase());
  //     })

  //   if (query.includes("evet") || query.includes("olabilir")) {
  //     botService.getChatResponse("Bir simülasyon içinde olduğunu düşün ve sen bir Psikologsun. Aşağıdaki kullanıcı ile konuş ve ona terapi uygula. Bunun dışındaki sorulara kesinlikle cevap verme!" + prompt.message)
  //       .then((resp) => {
  //         setLoading(false);
  //         setList(prevList => [...prevList, { message: resp.data, author: 'assistant' }]);
  //         setResponse(resp.data);
  //       })
  //   } else if(query.includes("hayır") || query.includes("olamaz")) {
  //     setList(prevList => [...prevList, { message: "Merhaba, ben bir sosyal destek asistanıyım. Lütfen ilgili sorular sorunuz.", author: 'assistant' }]);
  //   }
  // };

  const postOneMessage = (prompt) => {
    botService
      .postOneMessage(prompt)
      .then((resp) => setList([...list, resp]));
  };

  const clearMessage = () => {
    botService
      .clearChat()
      .then((resp) => setStatus(resp))
  }

  const clearIng = () => {
    clearMessage();
  }

  const values = {
    prompt,
    setPrompt,
    list,
    setList,
    response,
    setResponse,
    promptChange,
    getChatResponse,
    postOneMessage,
    status,
    clearIng,
    loading,
    sayac,
    getChatResponse2,
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
    chatChange,
    setAcıkKutu,
    acıkKutu,
    userId,
    getAllChats,
    feedback,
    setFeedback,
    createOneFeedback,
    putOneChat,
    clearChat
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContext;