import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDoorOpen, faDoorClosed} from '@fortawesome/free-solid-svg-icons';

function Doorinfo(props) {
    return(
        <div className="d-flex door-info pr-1 justify-content color-purple">
            <FontAwesomeIcon icon={props.isOpen ? faDoorOpen : faDoorClosed} className="door" />
            <div className="info">
                <p className={`door-name tex ${props.bor ? "tex-tra" : ""}`}>Door {props.door}</p>
                <p className={`points tex font-weight-bold ${props.bor ? "tex-tra" : ""}`}>{props.point} PTS</p>
            </div>
            <div className="img-cont">
                {props.isOpen && <img src={require('../../../assets/images/profile.png')} className="winner-img" alt="" />}
            </div>
        </div>
    );
}

export default Doorinfo;