import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/context";
import { post } from "../../auth0/http";
import { API_ROOT } from "../../auth0/api_config";
import "./Answer.scss";

function Answer(props) {
  const cont = useContext(Context);

  const [text, setText] = useState("");
  const click = () => {
    (async () => {
      let level_number = localStorage.getItem("level_number");
      if (level_number === "undefined" || level_number === null) {
        console.log("Level number corrupted");
      } else {
        let res = await post(`${API_ROOT}answer`, {
          answer: text,
          level_number: level_number,
        });
        if (!res.correct_answer) {
          cont.Alert("Wrong answer!");
        } else {
          console.log(res);
          localStorage.setItem(
            "level_number",
            parseInt(localStorage.getItem("level_number")) + 1
          );
          cont.setIsSolve(true);
          cont.Alert("Correct answer!");
          props.toggle();
        }
      }
    })();
  };

  const list = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ].map((x) => {
    return (
      <button className="butt" onClick={() => setText(text + x)} key={x}>
        {x}
      </button>
    );
  });

  return (
    <div id="answer-model">
      <FontAwesomeIcon
        onClick={() => props.toggle()}
        className="close cursor-pointer"
        icon={faTimesCircle}
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="t-box"
      ></input>
      <button className="sub butt" onClick={() => click()}></button>
      <div className="inpp">
        {list}
        <button className="enter butt" onClick={() => click()}>
          <p>Enter</p>
        </button>
        <button
          className="reset butt"
          onClick={() => setText(text.substring(0, text.length - 1))}
        >
          back
        </button>
      </div>
    </div>
  );
}

export default Answer;
