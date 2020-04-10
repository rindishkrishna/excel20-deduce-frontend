import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDoorOpen, faDoorClosed} from '@fortawesome/free-solid-svg-icons';

function Doorinfo(props) {
    return(
        <div className="d-flex door-info pl-4 pr-3 justify-content">
            <FontAwesomeIcon icon={props.isOpen ? faDoorOpen : faDoorClosed} className="door" />
            <div className="info">
                <p className="door-name">Door {props.door}</p>
                <p className="points">{props.point} PTS</p>
            </div>
            <img src={require('../profile.png')} className="winner-img" alt="" />
        </div>
    );
}

export default Doorinfo;