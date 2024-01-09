import axios from 'axios';

class FeedbackService {
  constructor() {
    this.baseUrl = "http://localhost:8080/feedback";
  }

  async createOneFeedback(feedback) {
    const url = this.baseUrl + "/send"
    return await axios.post(url, feedback).then((response) => response.data);
  }
  
}
export default FeedbackService;