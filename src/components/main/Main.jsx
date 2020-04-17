import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import Doorboard from "../doorboard/Doorboard";
import Chatarea from "../chatarea/Chatarea";
import Photo from "../photo/Photo";
import Answer from "../answer/Answer";
import Imagebox from "./Imagebox/Imagebox";
import { get } from "../../auth0/http";
import { API_ROOT } from "../../auth0/api_config";
import "./Main.scss";
import { login } from "../../auth0/auth0";

function Main() {
  const [level, setLevel] = useState({
    level_number: 1,
    level_file_1:
      "https://i.pinimg.com/originals/d7/59/9a/d7599abc9531c7f66995176121f23a8d.jpg",
    level_file_2:
      "https://i.pinimg.com/originals/37/79/aa/3779aa27032f591ae1fca049f8e2d462.jpg",
    level_file_3:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH9H_HfHTCzbVenSwrQ3d6U4vZbVNASiOTVPsMIh2KCOTXeRoT&usqp=CAU",
    level_file_4:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHQBAS9K-qg0f3lrHy64MRbQ5hj5ExBrxlVJORNVry4PDkqjRa&usqp=CAU",
    cover_image: null,
    question: "first question",
    hints: [{ hint: "bitch please" }],
  });
  const [isBoard, setBoard] = useState(false);
  const [isPhoto, setPhoto] = useState({
    state: false,
    image: level.level_file_2,
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
  const photo = (link) => {
    if (!isAnswer && !isNotice) {
      setPhoto({ image: link, state: !isPhoto.state });
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

  useEffect(async () => {
    let res = await get(API_ROOT + "question");
    console.log(res);
  }, []);

  return (
    <div id="main">
      <FontAwesomeIcon
        onClick={() => board()}
        className="toggle"
        icon={faAngleLeft}
      />
      <FontAwesomeIcon
        onClick={() => chat()}
        className="toggle-chat"
        icon={faCommentDots}
      />

      <Chatarea toggle={chat} cha={isChat} />
      <Doorboard toggle={board} bor={isBoard} />
      {isPhoto.state && <Photo toggle={photo} link={isPhoto.image} />}
      {isAnswer && <Answer toggle={answer} />}

      <img
        src={require("../../assets/images/mascot.png")}
        alt=""
        id="mascot"
        className={anime ? "mascot" : ""}
        onClick={() => setAnime(true)}
        onAnimationEnd={() => setAnime(false)}
      />

      <div className="contain">
        <div id="wall">
          {level.level_file_1 && (
            <Imagebox photo={photo} image={level.level_file_1} />
          )}
          {level.level_file_4 && (
            <div
              className={`graf d-flex justify-content-center ${
                isNotice ? "big-n" : ""
              }`}
              onClick={() => notice()}
            >
              <img
                className="graf-clue mx-auto d-block"
                src={level.level_file_4}
                alt=""
              />
            </div>
          )}
        </div>
        <div id="door">
          <div className="d-img">
            <div className="d-lock" onClick={() => answer()}></div>
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
