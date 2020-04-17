import React from 'react';
import './Chatarea.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

function Chatarea(props) {
    return(
        <div id="chat-area" className={`cha ${props.cha ? "cha-tra" : " "}`}>
            <FontAwesomeIcon onClick={() => props.toggle()} className={`toggle-3 ${props.cha ? "togg-tra" : " "}`} 
            icon = {faAngleDown} />
            <h1 className="text-center text-white">chat</h1>
        </div>
    );
}

export default Chatarea;