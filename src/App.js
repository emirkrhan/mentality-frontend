import './App.css';
import Home from './comp/Home/Home';
import Chatbot from './comp/bot/Chatbot';
import BotService from './service/BotService';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chatbot />} />
         
        </Routes>
     
    </div>
  );
}

export default App;
