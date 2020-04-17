import React from 'react';
import './Chatarea.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Chat from "../chat/src/App";

function Chatarea(props) {
    return(
        <div id="chat-area" className={`cha d-flex  flex-column ${props.cha ? "cha-tra" : " "}`}>
            <div>
            <FontAwesomeIcon onClick={() => props.toggle()} className={`toggle-3 ${props.cha ? "togg-tra" : " "}`} 
            icon = {faAngleLeft} />
            <h6 className="text-center grey-3 pt-2 pb-1">DISCUSSION BOARD</h6>
            </div>
            <Chat/>
        </div>
    );
}

export default Chatarea;