import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from './Components/LoginPage';
import UserPage from './Components/UserPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage></LoginPage>}></Route>
        <Route path='/user-page' element={<UserPage></UserPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
