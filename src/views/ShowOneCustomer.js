import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import './ShowOneCustomer.css';

const ShowOneCustomer = (props) => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState([]);

    const getCustomerData = () => {
        axios.get('http://localhost:8080/customer/' + id).then((req) => {
            setCustomerData(req.data);
        })
    }
    // console.log(customerData);

    useEffect(() => {
        getCustomerData();
    }, [])

    const deleteCustomer = (id) => {
        axios.delete('http://localhost:8080/customer/delete/' + id, {
            customer_id: id
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.error(error);
        }).then((res) => {
            props.getPeopleList();
            navigate('/clientlist');
        })
    }

    return (
        <div>
            <div className="customer">
                <div>{customerData.name}</div>
                <div>{customerData.address1}</div>
                <div>{customerData.address2}</div>
                <div>{customerData.nip}</div>
                <button className="btn" onClick={() => deleteCustomer(id)}>Usuń Klienta</button>
                <Link className="btn" to={"/showonecustomer/" + id + "/addactioncustomer"}>Dodaj akcje</Link>
            </div>
            <table className="tableActionCustomer">
                <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Notatka</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData.actions?.map(customerActions => {
                        console.log(customerActions);
                        return (
                            <tr key={customerActions._id}>
                                <td>{customerActions.type}</td>
                                <td>{customerActions.description}</td>
                                <td>{customerActions.date.slice(0, 10)}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    );
}

export default ShowOneCustomer;