import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AddActionCustomer = (props) => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]);

    const getCustomerData = () => {
        axios.get('http://localhost:8080/customer/' + id).then((req) => {
            setCustomerData(req.data);
        })
    }

    useEffect(() => {
        getCustomerData();
    }, [])

    const [formData, setFormData] = useState({
        date: '',
        type: '',
        description: '',
        customerId: id
    })

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]:target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/actionCustomer/add', {
        date: formData.date,
        type: formData.type,
        description: formData.description,
        customerId: id
    }).then((res) => {
        navigate("/showonecustomer/"+id);
        props.getPeopleList();
    });;

    }

    return (
        <div>
            <div className="customer">
                <div>{customerData.name}</div>
                <div>{customerData.address1}</div>
                <div>{customerData.address2}</div>
                <div>{customerData.nip}</div>
            </div>

            <form onSubmit={handleSubmit} action="http://localhost:8080/actionCustomer/add" method="POST">
                <label className="main" htmlFor="date">Data kontaktu</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange}></input>

                <label className="main" htmlFor="type">Typ akcji</label>
                <select name="type" id="type" value={formData.type} onChange={handleInputChange}>
                    <option value="---">---</option>
                    <option value="Telefon">Telefon</option>
                    <option value="Spotkanie">Spotkanie</option>
                    <option value="Inne">Inne</option>
                </select>

                <label className="main" htmlFor="description">Notatka</label>
                <input type="text" name="description" id="description" value={formData.description} onChange={handleInputChange}></input>

                <input type="submit" value="Dodaj akcję"></input>
            </form>
        </div>
    );
}

export default AddActionCustomer;