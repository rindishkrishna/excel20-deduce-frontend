import './Navbar.scss';
import React, {useEffect, useState} from 'react';
import {getProfile} from '../../auth0/auth0';

function Navbar(props) {
    const [user, setUser] = useState({
        name : null,
        image : null
    })
    useEffect(()=>{
    getProfile((err, user) => {
       if (err) {
         console.error(err);
       } else {
         setUser({
           name: user.given_name,
           image: user.picture
         })
       }
     })
    },[])
    return(
        <nav className="navbar nbar navbar-light d-flex">
            <a className="navbar-brand" href="/">
                <img src={require('../../assets/images/logo.png')} className="d-inline-block align-top logo" alt="" />
            </a>
            <div id="user-info" className="d-flex">
                <p className="score tex">MY SCORE : {props.score}</p>
                <div className="d-flex">
                    <p className="name tex">{user.name}</p>
                    <img src={user.image} className="d-inline-block align-top prof-img" alt="" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;