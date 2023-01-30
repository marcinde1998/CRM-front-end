import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./HomeLogin.css";

const Register = () => {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setRegisterData({
            ...registerData,
            [name]: target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/addUser', {
            username: registerData.username,
            password: registerData.password
        }).then((res) => {
            navigate("/Login");
        });
    }
    return (
        <div className="homeLogin">
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit} action="http://localhost:8080/addUser" method="POST">
                <label className="formAdd" htmlFor="username">Login: </label>
                <input className="formAdd" type="text" name="username" id="username" value={registerData.username} onChange={handleInputChange} required></input><br/>
                <label className="formAdd" htmlFor="password">Hasło: </label>
                <input className="formAdd" type="text" name="password" id="password" value={registerData.password} onChange={handleInputChange} required></input>

                <input type="submit" value="Zarejestruj" className="btn"></input>

            </form>
            <button onClick={() => {
                window.location.reload();
                navigate("/Login")
                
            }}>Mam już konto</button>
        </div>
    );
}

export default Register;