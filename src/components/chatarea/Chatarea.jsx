import React from "react";
import "./Chatarea.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Chat from "../chat/src/App";

function Chatarea(props) {
  return (
    <div
      id="chat-area"
      className={`cha d-flex cursor-default flex-column ${props.cha ? "cha-tra" : " "}`}
    >
      <div className={"position-sticky"} style={{top:0}}>
        <FontAwesomeIcon
          onClick={() => props.toggle()}
          className={`toggle-3 cursor-pointer ${props.cha ? "togg-tra" : "rotate-180 "}`}
          icon={faAngleDown}
        />
        <h6 style={{fontSize:'2.2vh'}} className="text-center grey-3 pt-2 pb-1">DISCUSSION BOARD</h6>
      </div>
      <Chat name={props.name} email={props.email} />
    </div>
  );
}

export default Chatarea;
