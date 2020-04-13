import React from 'react';
import './Reload.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';


function Reload(props) {
    return(
        <div className="reload text-center">
            <h1>Rotate your device</h1>
            <FontAwesomeIcon className="r-btn" icon={faRedoAlt} onClick={() => {
                if(window.innerHeight < window.innerWidth){
                    let x = document.documentElement.requestFullscreen()
                    x.catch(()=>alert("no fullscreen"))
                    props.screen(true);
                }
            }} />
            <p>click</p>
        </div>
    );
}

export default Reload;