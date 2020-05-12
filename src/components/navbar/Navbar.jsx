import './Navbar.scss';
import React, {useEffect, useState} from 'react';
import { logout } from '../../auth0/auth0';
import {get} from '../../auth0/http';
import {API_ROOT} from '../../auth0/api_config';

function Navbar(props) {
    const [isOpen,setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen );
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
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
            image : res.profile_picture, 
              score: res.score
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
                <p className="score tex">My Score : <span style={{fontWeight:500}}>{user.score}</span></p>
                <div className="d-flex">
                    <p className="name tex">{user.name}</p>
                    <div className="dropdown border-0">
                        <button style={{boxShadow:"none"}} className="btn btn-default dropdown-toggle" onClick={toggleOpen} type="button" id="menu1"
                                data-toggle="dropdown">
                        <img src={user.image} className="d-inline-block align-top prof-img" alt="" />
                            <span className="caret"> </span>
                        </button>
                        <div className={"dropdown-menu box-logout dropdown-menu-right "+menuClass} aria-labelledby="dropdownMenuButton">
                            <a onClick={logout} className="dropdown-item" href="#">Logout</a>
                        </div>
                    </div>
                    </div>
            </div>
        </nav>
    );
}

export default Navbar;