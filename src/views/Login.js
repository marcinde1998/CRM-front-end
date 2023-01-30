import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";
import "./Login.css";

const Login = (props) => {

console.log(props.displayUsersBase);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setLoginData({
            ...loginData,
            [name]: target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/login', {
            username: loginData.username,
            password: loginData.password
        }).then((res) => {
            console.log(res.data);
            props.setUsersBase(res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
        }).catch((error) => {
            console.error(error)
        });
    };
    console.log(loginData);
    return (
        <div className="login">
            <h2>Logowanie</h2>
            {props.usersBase && <Navigate to="/clientlist"/>}
            <form onSubmit={handleSubmit} action="http://localhost:8080/login" method="POST">
                <label htmlFor="username">Login: </label>
                <input type="text" name="username" id="username" value={loginData.username} onChange={handleInputChange} required></input><br/>
                
                <label htmlFor="password">Hasło: </label>
                <input type="text" name="password" id="password" value={loginData.password} onChange={handleInputChange} required></input><br/>

                <input type="submit" value="Zaloguj" className="btn"></input>

            </form>
        </div>
    );
}

export default Login;