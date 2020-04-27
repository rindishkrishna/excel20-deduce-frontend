import './Doorboard.scss';
import React, {useEffect} from 'react';
import Doorinfo from './doorinfo/Doorinfo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {API_ROOT} from '../../auth0/api_config';
import {get} from '../../auth0/http';

function Doorboard(props) {

    useEffect(()=>{
        (async () => {
            let res = await get(`${API_ROOT}leaderboard`);
            console.log(res);
        })();
    }, []);

    return(
        <div id="door-board" className={`bor cursor-default ${props.bor ? "bor-tra" : ""}`}>
            <div className={`toggle-2 cursor-pointer ${props.bor ? "togg-tra" : ""}`} onClick={() => props.toggle()}>
                <FontAwesomeIcon onClick={() => props.toggle()} icon = {faAngleRight} />
            </div>
            
            <Doorinfo isOpen = {true} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {true} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {true} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {false} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {false} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {false} door={1} point={300} bor={props.bor} />
            <Doorinfo isOpen = {false} door={1} point={300} bor={props.bor} />
        </div>
    );
}

export default Doorboard;