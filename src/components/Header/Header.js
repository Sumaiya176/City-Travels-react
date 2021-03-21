import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const Header = () => {
    return (
        <div className="header">
        <nav>
        <ul>
        <li className="logo"><a className="alogo" href="#">CITY TRAVELS</a></li>
        <li><a href="/home">Home</a></li>
        <li><a href="/details">Details</a></li>
        <li><Link to="/login">Destination</Link></li>
        <li><a href="/contact">Contact</a></li>
        <button><Link to="/login">Log in</Link></button>
        
        </ul>
        </nav>
    </div>
    );
};

export default Header;