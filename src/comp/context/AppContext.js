import { createContext, useEffect, useState } from "react";
import BotService from "../../service/BotService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const botService = new BotService();

  const [prompt, setPrompt] = useState({
    id: 0,
    message: "",
    author: "user"
  }
  );
  const [response, setResponse] = useState('');
  const [list, setList] = useState([]);

  const promptChange = (e) => {
    setPrompt({
      ...prompt,
      [e.target.name]: e.target.value
    });
  }

  const getAllMessages = () => {
    botService.getAllMessages()
      .then((data) => setList(data))
      .catch((error) => {
        console.error('Mesajları alırken bir hata oluştu:', error);
      });
  };


  const getChatResponse = () => {
    // const allMessages = list.map(item => item.message);
    const string1 = prompt.message;
    // const string2 = allMessages;

    // Son 4 mesajı al
const lastFourMessages = list.slice(-5);

// Sadece mesaj içeriklerini al
const string2 = lastFourMessages.map(item => item.author + ": " + item.message);

// Mesajları birleştir
const combinedString = string2.join("\n");

// Diğer işlemleri gerçekleştir...

// "ÖNCEKİ KONUŞMALAR" + combinedString + "ŞU ANKİ İSTEK" + string1
    botService.getChatResponse(prompt.message)
      .then((resp) => {

        setList(prevList => [...prevList, { message: resp.data, author: 'assistant' }]); // Botun yanıtını ekleyin
        setResponse(resp.data);
      })
      
      
  };
  



  const postOneMessage = (prompt) => {
    botService
      .postOneMessage(prompt)
      .then((resp) => setList([...list, resp]));
  };


  useEffect(() => {
    getAllMessages();
  }, []);

  // {
  //   message: prompt.message,
  //   author: prompt.author
  // }

  const values = {
    prompt,
    setPrompt,
    list,
    setList,
    response,
    setResponse,
    promptChange,
    getChatResponse,
    postOneMessage


  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContext;