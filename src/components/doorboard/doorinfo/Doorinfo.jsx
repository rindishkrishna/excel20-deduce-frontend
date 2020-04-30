import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDoorOpen, faDoorClosed} from '@fortawesome/free-solid-svg-icons';

function Doorinfo(props) {
    return(
        <div className={`d-flex door-info pr-1 justify-content grey-3 ${props.current ? "current-door" : ""}`}>
            <FontAwesomeIcon icon={props.isOpen ? faDoorOpen : faDoorClosed} className="door mr-2" />
            <div className="info">
                <p className={`door-name tex ${props.bor ? "tex-tra" : ""}`}>Door {props.door}</p>
                <p className={`points grey-2 tex font-weight-bold ${props.bor ? "tex-tra" : ""}`}>{props.point} PTS</p>
            </div>
            <div className="img-cont">
                {props.isOpen && <img src={require('../../../assets/images/profile.png')} className="winner-img d-block mx-auto" alt="" />}
                {props.isOpen && <p className="name">{props.isOpen}</p>}
            </div>
        </div>
    );
}

export default Doorinfo;