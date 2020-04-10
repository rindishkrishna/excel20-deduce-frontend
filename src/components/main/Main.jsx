import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import Doorboard from '../doorboard/Doorboard';
import Photo from './photo/Photo';
import Answer from './answer/Answer';
import './Main.scss';

function Main() {

    const [isBoard, setBoard] = useState(false);
    const [isPhoto, setPhoto] = useState(false);
    const [isAnswer, setAnswer] = useState(false);
    const photo = () => {
        if(!isAnswer){
            setPhoto(!isPhoto);
        }
    }
    const answer = () => {
        if(!isPhoto){
            setAnswer(!isAnswer);
        }
    } 
    const board = () => {
        setBoard(!isBoard);
    }

    return(
        <div id = "main">
            <FontAwesomeIcon onClick = {() => board()} className="toggle" icon = {faArrowCircleLeft} />
            {isBoard && <Doorboard toggle = {board} />}
            {isPhoto && <Photo toggle = {photo} />}
            {isAnswer && <Answer toggle = {answer} />}
            <div className="contain">
                <div id="wall">
                    <div className="graf">
                        <img className="graf-clue img-fluid mx-auto d-block" src={require('../../assets/images/logo.png')} alt="" />
                    </div>
                </div>
                <div id="door">
                    <div className="d-img">
                        <div className="d-lock" onClick={() => answer()}></div>
                    </div>
                </div>
                <div id="photo">
                    <div className="p-img" onClick={() => photo()}>
                        <div className="clue"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;