import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import './Notice.scss';

function Notice (props) {
    return(
        <div className={`notice text-center cursor-default`} >
            <FontAwesomeIcon
                onClick={() => props.toggle()}
                className="close cursor-pointer"
                icon={faTimesCircle}
            />
            <div className="p">
                <p>{props.question}</p>
            </div>
        </div>
    );
}

export default Notice;