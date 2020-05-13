import React, {useEffect, useState} from 'react';
import './Reload.scss';
import {ReactComponent as PhoneLogo} from '../../assets/images/phone.svg'
import {ReactComponent as Click} from '../../assets/images/click.svg'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';


function Reload(props) {
    const [fullscreen,setFullScreen] = useState(true);

    useEffect(() =>{
            if(!window.fullscreen && window.innerWidth < 961     ){
                setFullScreen(false)
            }
            else {
            setFullScreen(true)
        }
    },[]);


    return(
        <>
        <div className={"rotate reload text-center"}>
            <PhoneLogo className={"rotate-phone"}/>
            Please Rotate Your Screen
        </div>
            {!fullscreen ?
                <div className="reload d-block text-center" onClick={() => {
                    if (window.innerHeight < window.innerWidth) {
                        setFullScreen(true);
                        let x = document.documentElement.requestFullscreen();
                        x.catch(() => alert("no fullscreen"));
                        props.setScreen(true);
                    }
                }}>
                    <Click className={"click-phone"}/>
                    <br/>
                    Touch To Go Fullscreen
                </div>
                :
                null
            }
        </>
    );
}

export default Reload;