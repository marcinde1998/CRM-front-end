import React, { useState } from "react";
import axios from 'axios';

import './AddCustomer.css';

function AddCustomer(props) {

    const [formData, setFormData] = useState({
        name: '',
        address1: '',
        address2: '',
        nip: ''
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/add', {
            name: formData.name,
            address1: formData.address1,
            address2: formData.address2,
            nip: formData.nip
        })
        .then((res) => {
            props.getPeopleList();
        });
    }
    console.log(formData);
    return (
        <div className="containerAddCustomer">
            <h2>AddCustomer</h2>
            <form onSubmit={handleSubmit} action="http://localhost:8080/all" method="POST">
                <label className="formAdd" htmlFor="name">Nazwa</label>
                <input className="formAdd" type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required></input>
                <label className="formAdd" htmlFor="address1">Ulica</label>
                <input className="formAdd" type="text" name="address1" id="address1" value={formData.address1} onChange={handleInputChange} required></input>
                <label className="formAdd" htmlFor="address2">Miasto i kod pocztowy</label>
                <input className="formAdd" type="text" name="address2" id="address2" value={formData.address2} onChange={handleInputChange} required></input>
                <label className="formAdd" htmlFor="nip">NIP</label>
                <input className="formAdd" type="text" name="nip" id="nip" value={formData.nip} onChange={handleInputChange} required></input>
                <input type="submit" value="Dodaj Klienta" className="btn"></input>
            </form>
        </div>
    );
}

export default AddCustomer;