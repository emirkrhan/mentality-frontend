import React, { useState } from 'react';
import axios from 'axios';
import "./register.css"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        userName: "",
        userPassword: "",
        date: "",
        gender: "",
        userSalt: ""
    });
    const [userPassword, setUserPassword] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const [passwordDanger, setPasswordDanger] = useState(false);
    const navigate = useNavigate();

    const passwordTypeFunc = () => {
        if (passwordType == "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }

    }

    const regChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };

    const handleRegister = async () => {
        if (user.userPassword.length >= 8) {
            try {
                const response = await axios.post('http://localhost:8080/api/users/register', user);

                if (response.status === 200) {
                    navigate(`/login`);
                } else {
                    console.error('Kullanıcı kaydedilemedi.');
                }
            } catch (error) {
                console.error('Bir hata oluştu:', error);
            }
        } else {
            setPasswordDanger(true);
            setTimeout(() => {
                setPasswordDanger(false);
            }, 3000);
        }
    };

    return (
        <div className='register-container'>
            <div className="image-reg"></div>
            <div className="register-box">
                <div className="text-reg">Gerçek gücünü keşfet</div>
                <div className="undertext-reg">Hemen kayıt ol ve ücretsiz olarak deneme fırsatı yakala.</div>
                <div className="input-reg">
                    <div className="name-surname">
                        <input placeholder='Ad' type="text" id="name" name="name" value={user.name} onChange={regChange}></input>
                        <input placeholder='Soyad' type="text" id="surname" name="surname" value={user.surname} onChange={regChange}></input>
                    </div>
                    <input className='username-input' placeholder='Kullanıcı adı' type="text" id='userName' name='userName' value={user.userName} onChange={regChange} />
                    <div className="pass-input">
                        <input className='password' placeholder='Şifre' type={passwordType} id='userPassword' name='userPassword' value={user.userPassword} onChange={regChange} />
                        <button onClick={passwordTypeFunc} className='eye-button'>{passwordType == "password" ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i>}</button>
                    </div>
                    {passwordDanger ? <div>Lütfen 10 karakterden uzun bir şifre girin!</div> : ""}
                    <div className="date-gender">
                        <input placeholder='Doğum Tarihi' id="date" name="date" value={user.date} onChange={regChange}></input>
                        <input placeholder='Cinsiyet' id="gender" name="gender" value={user.gender} onChange={regChange}></input>
                    </div>


                    <button onClick={handleRegister}>Kayıt Ol</button>
                </div>
                <div className="login-route">
                    <div className="log-text">Zaten bir hesabın var mı?</div>
                    <a href='/login' className="log-tag">Giriş Yap</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
