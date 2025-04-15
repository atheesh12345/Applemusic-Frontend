import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage";
import Login from "./components/login";
import Signup from "./components/Signup";

const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/mainpage' element={<Mainpage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Signup/>}></Route>
      </Routes>

    </BrowserRouter>
      
   
  );
};

export default App;
