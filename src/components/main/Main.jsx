import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Doorboard from "../doorboard/Doorboard";
import Chatarea from "../chatarea/Chatarea";
import Photo from "../photo/Photo";
import Answer from "../answer/Answer";
import Imagebox from "./Imagebox/Imagebox";
import { get } from "../../auth0/http";
import { API_ROOT } from "../../auth0/api_config";
import "./Main.scss";

function Main(props) {
  const [level, setLevel] = useState({
    level_number: null,
    level_file_1: null,
    level_file_2: null,
    level_file_3: null,
    cover_image: null,
    question: null,
    hints: null,
  });
  const [isBoard, setBoard] = useState(false);
  const [isBubble, setBubble] = useState(false);
  const [isPhoto, setPhoto] = useState({
    state: false,
    image: "",
  });
  const [isNotice, setNotice] = useState(false);
  const [isAnswer, setAnswer] = useState(false);
  const [isChat, setChat] = useState(false);
  const [anime, setAnime] = useState(false);

  const notice = () => {
    if (!isAnswer && !isPhoto.state) {
      setNotice(!isNotice);
    }
  };
  const photo = (x, link) => {
    if (!isAnswer && !isNotice) {
      setPhoto({ image: link, state: x });
    }
  };
  const answer = () => {
    if (!isPhoto.state && !isNotice) {
      setAnswer(!isAnswer);
    }
  };
  const board = () => {
    setBoard(!isBoard);
  };
  const chat = () => {
    setChat(!isChat);
  };

  useEffect(() => {
    //Effect callbacks are synchronous to prevent race conditions
    (async () => {
      let res = await get(`${API_ROOT}question`);
      console.log(res);
      if (res) {
        setLevel(res);
        localStorage.setItem("level_number", res.level_number);
      }
    })();

    // Check if someone unlocked the level this user is currently on every 60 seconds
    let interval = setInterval(() => {
      let currLevel = localStorage.getItem("level_number");
      if (currLevel !== "undefined" || currLevel != null) {
        (async () => {
          let res = await get(`${API_ROOT}current_level`);
          if (res.level_number > currLevel) {
            // alert("Someone already solved this level!");
            // Give some better visual feedback to user and reload page after a small delay to get new level
          }
        })();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="main" className="cursor-default">
      {level.cover_image && <div className="cover-image">
          <img className="cover-clue" src={level.cover_image} alt="" />
      </div>}
      <div
        className={`door-btn cursor-pointer ${isBoard ? "toggle-chat" : ""}`}
        onClick={() => board()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      {/*      <div
        className={`chat-btn cursor-pointer ${isChat ? "toggle-chat" : ""}`}
        onClick={() => chat()}
      >
        <p>
          chat <FontAwesomeIcon icon={faCommentDots} />
        </p>
      </div>*/}

      <Chatarea
        toggle={chat}
        cha={isChat}
        name={props.name}
        email={props.email}
      />
      <Doorboard toggle={board} bor={isBoard} />
      {isPhoto.state && <Photo toggle={photo} link={isPhoto.image} />}
      {isAnswer && <Answer toggle={answer} />}

      <div className="mascot-hint">
        {(!anime && level.hints) && <div>
          {isBubble ? 
          (<div onClick={() => setBubble(false)} className="bubble cursor-pointer">
            {level.hints.map((x, i) => <p key={i}>{x.hint}</p>)}
          </div>):
          <FontAwesomeIcon onClick={() => setBubble(true)} className="bulb cursor-pointer" 
          icon={faLightbulb} />}
        </div>}
        <img
          src={require("../../assets/images/mascot.png")}
          alt=""
          id="mascot"
          className={`cursor-pointer ${anime ? "mascot" : ""}`}
          onClick={() => setAnime(true)}
          onAnimationEnd={() => setAnime(false)}
        />
      </div>

      <div className="contain">
        <div id="wall">
          {level.level_file_1 && (
            <Imagebox photo={photo} image={level.level_file_1} />
          )}
          {level.question && (
            <div
              className={`graf cursor-pointer text-center ${
                isNotice ? "big-n" : ""
              }`}
              onClick={() => notice()}
            >
              <div className="p">
                <p>{level.question}</p>
              </div>
            </div>
          )}
        </div>
        <div id="door">
          <div className="d-img">
            <div
              className="d-lock cursor-pointer"
              onClick={() => answer()}
            ></div>
          </div>
        </div>
        <div id="photo" className="d-flex">
          {level.level_file_2 && (
            <Imagebox photo={photo} image={level.level_file_2} />
          )}
          {level.level_file_3 && (
            <Imagebox three={true} photo={photo} image={level.level_file_3} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
