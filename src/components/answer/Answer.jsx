import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import './Answer.scss';

function Answer(props) {

    const [text, setText] = useState('');
    const click = (e) => {
        e.preventDefault();
        console.log(text);
    }

    return(
        <div id="answer-model">
            <FontAwesomeIcon onClick={() => props.toggle()} className="close" 
            icon = {faTimesCircle} />
            <form>
                <input value={text} onChange={(e) => setText(e.target.value)} 
                type="text" className="t-box" ></input>
                <button className="sub" onClick={(e) => click(e)}></button>
            </form>
        </div>
    );
}

export default Answer;
