import './Navbar.scss';
import React from 'react';

function Navbar(props) {
    return(
        <nav className="navbar nbar navbar-light d-flex">
            <a className="navbar-brand" href="/">
                <img src={require('../../assets/images/logo.png')} className="d-inline-block align-top logo" alt="" />
            </a>
            <div id="user-info" className="d-flex">
                <p className="score tex">MY SCORE : {props.score}</p>
                <div className="d-flex">
                    <p className="name tex">{props.name}</p>
                    <img src={props.image} className="d-inline-block align-top prof-img" alt="" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;