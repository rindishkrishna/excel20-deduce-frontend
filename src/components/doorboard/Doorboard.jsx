import './Doorboard.scss';
import React from 'react';
import Doorinfo from './doorinfo/Doorinfo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';

function Doorboard(props) {
    return(
        <div id="door-board">
            <FontAwesomeIcon onClick={() => props.toggle()} className='toggle' icon = {faArrowAltCircleRight} />
            <Doorinfo isOpen = {true} door={1} point={300} />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
            <Doorinfo door="1" point="300" />
        </div>
    );
}

export default Doorboard;