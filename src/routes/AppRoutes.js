import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";


import AddActionCustomer from '../views/AddActionCustomer';
import AddCustomer from '../views/AddCustomer';
import HomeLogin from '../views/HomeLogin';
import Login from '../views/Login';
import ClientList from '../views/ClientList';
import ShowOneCustomer from '../views/ShowOneCustomer';

const AppRoutes = (props) => {
    const [peopleBase, setPeopleBase] = useState([]);
    
     const getPeopleList = () => {
        axios.get('http://localhost:8080/all').then((req) => {
            setPeopleBase(req.data);
        })
    }

    useEffect(() => {
        getPeopleList();
    }, [props.usersBase])
    

    return (
        <Routes>
            <Route path="/" element={<HomeLogin />} />
            <Route path="/login" element={<Login usersBase={props.usersBase} setUsersBase={props.setUsersBase}/>} />
            <Route path="/clientlist" element={<ClientList usersBase={props.usersBase} displayPeopleBase = {peopleBase} getPeopleList = {getPeopleList}/>} />
            <Route path="/addcustomer" element={<AddCustomer getPeopleList = {getPeopleList}/>} />
            <Route path="/showonecustomer/:id/addactioncustomer" element={<AddActionCustomer getPeopleList = {getPeopleList}/>} />
            <Route path="/showonecustomer/:id" element={<ShowOneCustomer displayPeopleBase = {peopleBase} getPeopleList = {getPeopleList}/>} />
        </Routes>
    );
}

export default AppRoutes;