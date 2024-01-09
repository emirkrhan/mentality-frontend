import axios from 'axios';

class ChatService {
  constructor() {
    this.baseUrl = "http://localhost:8080/api/chats";
  }

  async getAllChats(userId) {
    return await axios.get(`${this.baseUrl}?userId=${userId}`).then((response) => response.data);
  }

  async createOneChat(chat) {
    return await axios.post(this.baseUrl, chat).then((response) => response.data);
  }

  async putOneChat(chatid) {
    return await axios.put(`${this.baseUrl}?chatId=${chatid}`);
  }
  
}
export default ChatService;