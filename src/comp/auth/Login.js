import React, { useState } from 'react';
import axios from 'axios'; // Axios kütüphanesini import et
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState("password");

    const passwordTypeFunc = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        }else{
            setPasswordType("password")
        }
        
    }


    const handleLogin = async () => {
        try {
            // Axios ile POST isteği gönder
            const response = await axios.post('http://localhost:8080/api/users/login', {
                userName: username,
                userPassword: password,
            }, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const userToken = response.data;
                const decodedToken = jwtDecode(userToken);
                sessionStorage.setItem('userId', decodedToken.userid);
                sessionStorage.setItem('userName', decodedToken.username);
                navigate(`/chats`);
            } else {
                console.error('Giriş başarısız!');
            }
        } catch (error) {
            console.error('Giriş yapılırken bir hata oluştu:', error);
        }
    };

    return (
        <div className='register-container'>
           
            <div className="register-box">
                <div className="text-reg">Gerçek gücünü keşfet</div>
                <div className="undertext-reg">Hemen giriş yap ve ücretsiz olarak deneme fırsatı yakala.</div>
                <div className="input-reg">
                    <input className='username-input' placeholder='Kullanıcı adı giriniz' type="text" id='userName' name='userName' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <div className="pass-input">
                        <input className='password' placeholder='Şifre giriniz' type={passwordType} id='userPassword' name='userPassword' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={passwordTypeFunc} className='eye-button'>{passwordType === "password" ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i>}</button>
                    </div>

                    <button onClick={handleLogin}>Giriş Yap</button>
                </div>
                <div className="login-route">
                    <div className="log-text">Hesabın yok mu?</div>
                    <a href='/register' className="log-tag">Kayıt Ol</a>
                </div>
            </div>
            <div className="image-reg"></div>
        </div>
    );
};

export default Login;
