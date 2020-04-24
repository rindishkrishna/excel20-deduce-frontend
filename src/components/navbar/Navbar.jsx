import './Navbar.scss';
import React, {useEffect, useState} from 'react';
//import {getProfile} from '../../auth0/auth0';
import {get} from '../../auth0/http';
import {API_ROOT} from '../../auth0/api_config';

function Navbar(props) {
    const [user, setUser] = useState({
        name : null,
        image : null
    });
    useEffect(()=>{
      (async () => {
        let res = await get(`${API_ROOT}user_info`);
        if (res) {
          setUser({
            name : res.name,
            image : res.profile_picture
          })
        }
      })();
    // getProfile((err, user) => {
    //    if (err) {
    //      console.error(err);
    //    } else {
    //      setUser({
    //        name: user.given_name,
    //        image: user.picture
    //      })
    //    }
    //  })
    },[])
    return(
        <nav className="navbar cursor-default nbar navbar-light d-flex">
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