import './App.css';
import Home from './comp/Home/Home';
import Login from './comp/auth/Login';
import Register from './comp/auth/Register';
import Privacy from './comp/belge/Privacy';
import Terms from './comp/belge/Terms';
import Chatbot from './comp/bot/Chatbot';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './comp/dashboard/Dashboard';

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chatbot />} />
        <Route path='/chats' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/privacy-policy' element={<Privacy />} />
        <Route path='/terms-of-use' element={<Terms />} />
      </Routes>
    </div>
  );
}

export default App;
