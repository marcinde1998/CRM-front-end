import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
import React, { useState } from "react";


import axios from 'axios';


function App() {

  const [usersBase, setUsersBase] = useState(JSON.parse(localStorage.getItem('user')));


  console.log(usersBase);
  
  axios.defaults.headers.common['Authorization'] = usersBase ? usersBase.jwt : "";
  return (
    <div className="App">
      <AppNav usersBase={usersBase} setUsersBase={setUsersBase}/>
      <AppRoutes usersBase={usersBase} setUsersBase={setUsersBase}/>
    </div>
  );
}

export default App;
