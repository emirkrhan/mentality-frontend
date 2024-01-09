import axios from 'axios';

class BotService {
  constructor() {
    this.baseUrl = "http://localhost:8080/bot";
  }

  async getAllMessages(chatId, userId) {
    try {
      const response = await axios.get(`${this.baseUrl}?chatId=${chatId}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Mesajları alma sırasında bir hata oluştu:', error);
      throw error;
    }
  }
  


  async getChatResponse(prompt, userid, chatid) {
    const url = this.baseUrl + "/chat";
    return await axios.get(url, {
               params: {
                 prompt: prompt,
                 userid: userid,
                 chatid: chatid
               },
               withCredentials: true
             });
  }

  async getChatResponse2(prompt) {
    const url = this.baseUrl + "/chat2";
    return await axios.get(url, {
               params: {
                 prompt: prompt
               },
               withCredentials: true
             });
  }

  // async getChatResponseTwo(prompt) {
  //   const url = this.baseUrl + "/chattwo";
  //   return await axios.get(url, {
  //              params: {
  //                prompt: prompt
  //              },
  //              withCredentials: true
  //            });
  // }

  async postOneMessage(message) {
    const url = this.baseUrl + "/send-message";
    return await axios.post(url, message).then((resp) => resp.data);
  }

  async clearChat(user) {
    const url = this.baseUrl + "/clear";
    return await axios.post(url, user).then((resp) => resp.data);
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
