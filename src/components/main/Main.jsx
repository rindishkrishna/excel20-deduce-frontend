import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import Doorboard from '../doorboard/Doorboard';
import Chatarea from '../chatarea/Chatarea';
import Photo from '../photo/Photo';
import Answer from '../answer/Answer';
import './Main.scss';

function Main() {

    const [isBoard, setBoard] = useState(false);
    const [isPhoto, setPhoto] = useState(false);
    const [isAnswer, setAnswer] = useState(false);
    const [isChat, setChat] = useState(false);
    const [anime, setAnime] = useState(false);

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
    const chat = () => {
        setChat(!isChat);
    }

    return(
        <div id = "main">
            <FontAwesomeIcon onClick = {() => board()} className="toggle" 
            icon = {faAngleLeft} />
            <FontAwesomeIcon onClick = {() => chat()} className="toggle-chat" 
            icon = {faCommentDots} />

            {isChat && <Chatarea toggle = {chat} />}
            {isBoard && <Doorboard toggle = {board} />}
            {isPhoto && <Photo toggle = {photo} />}
            {isAnswer && <Answer toggle = {answer} />}

            <img src={require('../../assets/images/mascot.png')} alt="" id="mascot" 
            className={anime ? "mascot" : ""} onClick={() => setAnime(true)} 
            onAnimationEnd={() => setAnime(false)} />
            
            <div className="contain">
                <div id="wall">
                    <div className="graf d-flex justify-content-center">
                        <img className="graf-clue img-fluid mx-auto d-block" 
                        src={require('../../assets/images/logo.png')} alt="" />
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