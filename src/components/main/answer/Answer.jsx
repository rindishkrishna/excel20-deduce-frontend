import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import './Answer.scss';

function Answer(props) {
    return(
        <div id="answer-model">
            <FontAwesomeIcon onClick={() => props.toggle()} className="close" icon = {faTimesCircle} />
            <input type="text" className="t-box" ></input>
        </div>
    );
}

export default Answer;
