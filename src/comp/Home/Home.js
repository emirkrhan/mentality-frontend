import React from 'react'
import "./home.css"

function Home() {
  return (
    <div className="big-cont">
      <div className="anima-cont">
        <div className="menu-container">
          <div className="logo-cont">
            <div className="logo-image"></div>
            <div className="logo-text">Mentality.co</div>
          </div>
          <div className="tag-cont">
            <a href="/">Anasayfa</a>
            <a href="/chat">Konuş</a>
            <a className='tag-pos' href="/blog">Blog &nbsp; <i class="fa-solid fa-caret-down"></i>
            <div className="opening-menu"></div></a>
            <a href="/contact">İletişim</a>
          </div>
        </div>
        <div className="color-box">Örnek diyalogları incele &nbsp; <i class="fa-solid fa-arrow-right-long fa-fade"></i>
        
        </div>
        <div className="text-box">Hayata bağlanmak için en etkili yollardan biri.</div>
        <div className="slogan-box">Stres ve depresyon seni çaresiz bıraktıysa Mentality.co ile kendine psikolojik <br/> 
        danışmanlık sağla! Hem ücretsiz, hem de çok gizli!</div>
        <div className="button-container">
          <a className='login' href='/login'>Giriş Yap</a>
          <a href='signin' className='signin'>Üye Ol</a>
        </div>
      

      </div>

     

    </div>
    
  )
}

export default Home

