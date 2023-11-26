import { createContext, useState } from "react";
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

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);
  


  const getChatResponse = () => {
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