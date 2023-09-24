import { useState } from "react"
import { setAccessToken, setRefreshToken } from "../Utility-Functions/LoginTokens"
import { useNavigate } from "react-router-dom"
import '../CSS/Login.css'
import BitDrop from '../assets/BitDrop.png'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState(``)
    const [password, setPassword] = useState(``)

    const handleLogin = () => {
        console.log(username, password)
        fetch('http://127.0.0.1:3000/user/login', {
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
                    setAccessToken(res.accsessToken)
                    setRefreshToken(res.refreshToken)
                    navigate('/')
                } else {
                    alert('Wrong Username/Password')
                }
            })
    }
    return (
        <>
            <div className="Login-Body">
                <img src={BitDrop} alt="" />
                <div className="Login-Wrapper">
                    <div className="Login-Container">
                        {/* <h2>Log In</h2> */}
                        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Your Username" />
                        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password" />
                        <button onClick={handleLogin}>Log In</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login