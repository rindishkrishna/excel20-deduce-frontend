import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import './Photo.scss';

function Photo(props) {
    return(
        <div id="photo-model">
            <FontAwesomeIcon onClick={() => props.toggle()} className="close" icon = {faTimesCircle} />
            <div className="clue"></div>
        </div>
    );
}

export default Photo;
