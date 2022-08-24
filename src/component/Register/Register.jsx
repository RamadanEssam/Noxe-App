import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'


import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [errorList, seterrorList] = useState([])
  const [loading, setloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState(null)
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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
    // To Prevent Relode
    e.preventDefault()
    let ValidResult = ValidData()
    console.log(ValidResult);
    if (ValidResult.error == null) {
    // 1-install axios 
    // 2-destract to data 
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
      console.log(data);
      setloading(false)
      if (data.message === 'success') {
        // Registration tmam 
        navigate('/login')

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

      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      age: Joi.number().min(16).max(80).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z0-9]{3,10}$')),
      email: Joi.string().email({ tlds: ['net', 'com', 'eg'] }).required()
    })

    return vaildUser.validate(user, { abortEarly: false })

  }
  return (
    <div className='container'>

      <h1>Registeration Form</h1>
      {
        errorMessage ? <div className='alert alert-danger'>
          {errorMessage}  <Link to="/login">login?</Link>
        </div> : ''
      }

      {errorList.map((elment, i) => {
        if (elment.path[0] === 'password') {
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
          <label htmlFor="first_name">First Name</label>
          <input type="text" onChange={getUserData} name="first_name" id="first_name" className='form-control bg-transparent text-white' />
        </div>
        <div className='my-3'>
          <label htmlFor="last_name">last Name</label>
          <input type="text" onChange={getUserData} name="last_name" id="last_name" className='form-control bg-transparent text-white' />
        </div>
        <div className='my-3'>
          <label htmlFor="age">age</label>
          <input type="number" onChange={getUserData} name="age" id="age" className='form-control bg-transparent text-white' />
        </div>
        <div className='my-3'>
          <label htmlFor="email">email</label>
          <input type="email" onChange={getUserData} name="email" id="email" className='form-control bg-transparent text-white' />
        </div>
        <div className='my-3'>
          <label htmlFor="password">password</label>
          <input type="password" onChange={getUserData} name="password" id="password" className='form-control bg-transparent text-white' />
        </div>

        <button className='btn btn-outline-info my-2' type='submit'>
          {loading === true ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Register'}
        </button>
      </form>
    </div>
  )
}
