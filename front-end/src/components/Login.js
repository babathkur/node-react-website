import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, []);
    const handleLogin = async () => {
        console.log("email,password", email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.email) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        } else {
            alert("please enter correct detail")
        }


    }
    return (
        <div className="login">
            <h1>login page</h1>
            <input className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <input className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter Password" />
            <button onClick={handleLogin} className="appButton" type="button"> Login</button>

        </div>
    )
}
export default Login;