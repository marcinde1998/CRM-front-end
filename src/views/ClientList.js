import "./ClientList.css";
import { Link, Navigate } from 'react-router-dom'

function ClientList(props) {

    return (
        <div className="containerCustomers">
            {!props.usersBase && <Navigate to="/login"/>}
            <h2>Lista Klientów</h2>
            <li className="linkToCustomer">
                <Link to="/addcustomer">Dodaj Klienta</Link>
            </li>
            <div className="customerList">
            {props.displayPeopleBase.map(customer => {
                return (
                    <div className="containerOneCustomer" key={customer._id}>
                    <Link className="containerOneCustomerLink" key={customer._id} to={"/showonecustomer/" + customer._id} >
                        <div>{customer.name}</div>
                        <div>{customer.address1}</div>
                        <div>{customer.address2}</div>
                        <div>{customer.nip}</div>
                    </Link>
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default ClientList;