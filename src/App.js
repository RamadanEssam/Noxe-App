import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './component/Home/Home';
import Movies from './component/Movies/Movies';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import Moviedetails from './component/Moviedetails/Moviedetails';



function App() {
  let navigate = useNavigate()

  const [userData, setuserData] = useState(null)

  function saveUserData() {
    let token = localStorage.getItem("userToken")
    let data = jwtDecode(token)
    setuserData(data)
  }

  function ProdectedRouting({ children }) {
    if (localStorage.getItem("userToken") != null) {
      // User Magod
      return children
    }
    else {
      return <Navigate to="/login" />
    }
  }


  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      saveUserData()
    }
  }, [])

  function logout() {
    localStorage.removeItem("userToken")
    setuserData(null)
    navigate("/login")
  }

  return (
    <div>

      <Navbar userData={userData} logout={logout} />
      <Routes>
        <Route path='/' element={<ProdectedRouting><Home userData={userData} /></ProdectedRouting>} />
        <Route path='home' element={<ProdectedRouting><Home userData={userData} /></ProdectedRouting>} />
        <Route path='movies' element={<ProdectedRouting><Movies /></ProdectedRouting>} />
        <Route path='moviedetails' element={<Moviedetails />} >

          <Route   path=':id' element={<Moviedetails />}/>
        </Route>
        <Route path='login' element={<Login saveUser={saveUserData} />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<h2>404</h2>} />
      </Routes>
    </div>
  );
}

export default App;
