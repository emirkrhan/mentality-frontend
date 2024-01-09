import React, { useContext, useState } from 'react'
import "./home.css"
import AppContext from "../context/AppContext";
import { Cross as Hamburger } from 'hamburger-react'

function Home() {

  const {
    postOneMessage


  } = useContext(AppContext);



  const [isOpen, setOpen] = useState(false)


  return (
    <div className="big-cont">
      <div className='back-gr'></div>
      <div className="navbar">
        <div className="logo-cont">
          <div className="logo-div">
            <div className="logo-image"></div>
            <div className="logo-text">Mentality</div>
          </div>
        </div>
        <div className="menu-cont">
          <Hamburger rounded toggled={isOpen} toggle={setOpen} size={25} />
          {isOpen ? <div className="menu-tags">
            <div className="tag-column">
              <a href="">Ana Sayfa</a>
              <a href="/login">Giriş Yap</a>
              <a href="/register">Kayıt Ol</a>
              <a href="">Hakkında</a>
              <a href="">Şirket</a>
              <a href="">İletişim</a>
            </div>

            <div className="tag-column">
              <a href="">Terapi Şeması</a>
              <a href="">Öğreticiler</a>
              <a href="">Mentality Plus &nbsp; <i class="fa-solid fa-bolt"></i></a>
              <a href="">Geri Bildirim</a>
              <a href="">Blog ve Forum</a>
              <a href="">İstatistikler</a>
            </div>

            <div className="tag-column">
              <a href="">Lisans</a>
              <a href="">Temalar</a>
              <a href="">Yardım</a>
              <a href="/terms-of-use">Kullanım Koşulları</a>
              <a href="/privacy-policy">Gizlilik Politikası</a>
              <a href="">Çerez Kullanımı</a>
              
            </div>
          </div> : ""}
        </div>
      </div>
      <div className="content-container">
        <div className="btn-cont">
          <button>
            <div className="icon-btn-one"><i class="fa-solid fa-circle fa-beat-fade"></i></div>
            <div className='text-btn'>Son Yenilikleri Gör</div>
            <div className='icon-btn-two'> v1.2.0 &nbsp; <i class="fa-solid fa-arrow-right"></i></div>
          </button>
        </div>
        <div className="text-cont">Basitleştirilmiş terapist hizmetleri</div>
        <div className="bottext">Mental sağlığını geri kazanmak ve hayatının yüksek temposundan
          birkaç dakikalığına uzaklaşmak için hemen basitleştirilmiş bir terapi başlat!
          Gerisini düşünme, Mentality senin için her şeyi halledecek.</div>
        <div className="bottom-btn">
          <button>Hemen Başla</button>
        </div>
      </div>


    </div>

  )
}

export default Home

