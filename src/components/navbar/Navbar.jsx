import './Navbar.scss';
import React from 'react';

function Navbar(props) {
    return(
        <nav className="navbar nbar navbar-light d-flex">
            <a className="navbar-brand" href="/">
                <img src={require('../../assets/images/logo.png')} className="d-inline-block align-top logo" alt="" />
            </a>
            <div id="user-info" className="d-flex">
                <h5 className="score mr-5 mt-2">MY SCORE : {props.score}</h5>
                <div className="d-flex">
                    <h5 className="mr-3 mt-2">{props.name}</h5>
                    <img src={require('../../assets/images/profile.png')} className="d-inline-block align-top prof-img" alt="" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;