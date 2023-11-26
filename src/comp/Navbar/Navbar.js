import React from 'react'
import "./navbar.css"

function Navbar() {
  return (
    <div className='navbar-container'>
        <div className="center-nav">
            <div className="nav-tag tag-home"></div>
            <div className="nav-tag tag-chat"></div>
            <div className="nav-tag tag-security"></div>
            <div className="nav-tag tag-why"></div>
            <div className="nav-tagbtn tag-login">Giriş Yap</div>
            <div className="nav-tagbtn tag-register"><i class="fa-solid fa-circle fa-fade"></i> &nbsp; Kayıt Ol</div>
           
        </div>
    </div>
  )
}

export default Navbar