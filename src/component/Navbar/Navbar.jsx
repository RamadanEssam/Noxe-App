import React from 'react'


import logo from '../../images/logo-dark.webp'


import { Link, NavLink } from 'react-router-dom'
export default function Navbar({ userData,logout }) {


    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='home'>
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            {userData ? <> <li className="nav-item">
                                <NavLink className="nav-link" to="home">Home</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="movies">Movies</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="home">people</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="home">Network</NavLink>
                                </li></> : ""}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <i className='fa-brands fa-facebook m-2'></i>
                                <i className='fa-brands fa-instagram m-2'></i>
                                <i className='fa-brands fa-youtube m-2'></i>
                                <i className='fa-brands fa-twitter m-2'></i>
                            </li>

                            {userData ? <li className="nav-item">
                                <span className="nav-link" onClick={logout}>logout</span>
                            </li> : <> <li className="nav-item">
                                <NavLink className="nav-link" to="login">Login</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="register">Register</NavLink>
                                </li></>}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
