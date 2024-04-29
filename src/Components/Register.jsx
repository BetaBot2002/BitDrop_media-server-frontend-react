import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Register.css'
import BitDrop from '../assets/BitDrop.png'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState(``)
    const [password, setPassword] = useState(``)

    const handleRegister = () => {
        console.log(username, password)
        fetch('http://127.0.0.1:3000/user/register', {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": `${username}`,
                "password": `${password}`

            })
        }).then(response => response.json())
            .then((res) => {
                if (!res.message) {
                    navigate('/')
                } else {
                    alert('User Already Exist')
                }
            })
    }
    return (
        <>
            <div className="Register-Body">
                <img src={BitDrop} alt="" />
                <div className="Register-Wrapper">
                    <div className="Register-Container">
                        {/* <h2>Log In</h2> */}
                        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Your Username" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password" />
                        <button onClick={handleRegister}>Register</button>
                        <p>Already have an account? <Link to='/login' className="Register-Link">Login</Link></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register
