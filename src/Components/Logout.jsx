import React from 'react'
import { getRefreshToken, setAccessToken, setRefreshToken } from '../Utility-Functions/LoginTokens'
import { useNavigate } from 'react-router-dom'
import '../CSS/LogoutButton.css'
const Logout = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        const URL=`http://127.0.0.1:3000/user/logout`
        const OPTIONS={
            method:`POST`,
            headers:{
                "Authorization":`bearer ${getRefreshToken()}`
            }
        }
        fetch(URL,OPTIONS)
        .then(response=>response.json())
        .then((res)=>{
            setAccessToken(``)
            setRefreshToken(``)
            navigate('/login')
        })
    }

    return (
        <>
            <button onClick={handleLogout} className='LogoutButton'>Log Out</button>
        </>
    )
}

export default Logout
