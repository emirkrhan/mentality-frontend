import axios from 'axios';

class BotService {
  constructor() {
    this.baseUrl = "https://annoyed-sweater-production.up.railway.app";
  }

  async getAllMessages() {
    return await axios.get(this.baseUrl).then((response) => response.data);
  }

  async getChatResponse(prompt) {
    const url = this.baseUrl + "/chat";
    return await axios.get(url, {
               params: {
                 prompt: prompt
               },
               withCredentials: true
             });
  }

  async postOneMessage(message) {
    const url = this.baseUrl + "/send-message";
    return await axios.post(url, message).then((resp) => resp.data);
  }
  
}
export default BotService;

// const BotService = () => {
  



//   const handleChatRequest = async () => {
//     try {
//       const apiURL = 'http://localhost:8082/bot/chat';
//       const savePromptURL = 'http://localhost:8082/bot/send-message';

//       await axios.post(savePromptURL, );

//       const response = await axios.get(apiURL, {
//         params: {
//           prompt: prompt?.message
//         },
//         withCredentials: true
//       });

//       setResponse(response.data);
//     } catch (error) {
//       console.error('Hata oluştu:', error);
//     }
//   };

//   return (
    
//   );
// };

// export default BotService;
