import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'

export default function Login({ saveUser }) {


  const [errorList, seterrorList] = useState([])
  const [loading, setloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState(null)
  const [user, setUser] = useState({
    password: "",
    email: ""
  })
  let navigate = useNavigate()
  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
    console.log(myUser);

  }

  async function submitForm(e) {
    setloading(true)
    e.preventDefault()
    let ValidResult = ValidData()
    console.log(ValidResult);
    if (ValidResult.error == null) {
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user)
      console.log(data);
      setloading(false)
      if (data.message == 'success') {
        // Tmam Login
        localStorage.setItem("userToken", data.token)
        saveUser()
        navigate('/home')

      }
      else {
        // error
        seterrorMessage(data.message)
      }
    }
    else {
      setloading(false)
      seterrorList(ValidResult.error.details)
      // 
    }

  }



  function ValidData() {
    let vaildUser = Joi.object({
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z0-9]{3,10}$')),
      email: Joi.string().email({ tlds: ['net', 'com', 'eg'] }).required()
    })

    return vaildUser.validate(user, { abortEarly: false })

  }
  return (
    <div className='container'>

      <h1>Login Form</h1>
      {
        errorMessage ? <div className='alert alert-danger'>
          {errorMessage}
        </div> : ''
      }

      {errorList.map((elment, i) => {
        if (elment.path[0] == 'password') {
          return <p className='text-danger' key={i}>
            password Must be 1 Uppercase Char
          </p>
        }
        else {
          return <p className='text-danger' key={i}>{elment.message}</p>
        }
      })}


      <form onSubmit={submitForm}  >

        <div className='my-3'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={getUserData} name="email" id="email" className='form-control bg-transparent text-white' />
        </div>
        <div className='my-3'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={getUserData} name="password" id="password" className='form-control bg-transparent text-white' />
        </div>

        <button className='btn btn-outline-info my-2' type='submit'>
          {loading == true ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Login'}
        </button>
      </form>
    </div>
  )
}
