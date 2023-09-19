import React from 'react'
import Logout from './Logout'
import BitDropNav from '../assets/BitDrop.png'
import '../CSS/NavBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='navbar'>
      <Link to='/home' className='logoNav'><img src={BitDropNav} className='logoNav' /></Link>
      <Logout/>
    </div>
  )
}

export default NavBar
