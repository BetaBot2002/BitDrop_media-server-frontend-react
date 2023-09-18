import React from 'react'
import Logout from './Logout'
import BitDropNav from '../assets/BitDrop.png'
import '../CSS/NavBar.css'
const NavBar = () => {
  return (
    <div className='navbar'>
      <img src={BitDropNav} className='logoNav' />
      <Logout/>
    </div>
  )
}

export default NavBar
