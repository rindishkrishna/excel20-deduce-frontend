import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import './Answer.scss';

function Answer(props) {

    const [text, setText] = useState('');
    const click = () => {
        alert(text);
    }

    const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
                  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                  "a", "s", "d", "f", "g", "h", "j", "k", "l",
                  "z", "x", "c", "v", "b", "n", "m"].map((x) => {
                      return(<button className="butt" onClick={() => setText(text + x)}>{x}</button>)
                  })

    return(
        <div id="answer-model">
            <FontAwesomeIcon onClick={() => props.toggle()} className="close" 
            icon = {faTimesCircle} />
            <input value={text} onChange={(e) => setText(e.target.value)} 
            type="text" className="t-box" ></input>
            <button className="sub butt" onClick={() => click()}></button>
            <div className="inpp">
                {list}
                <button className="enter butt" onClick={() => click()}><p>enter</p></button>
                <button className="reset butt" onClick={() => setText(text.substring(0, text.length - 1))}>back</button>
            </div>
        </div>
    );
}

export default Answer;