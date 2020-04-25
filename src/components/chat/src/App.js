import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { ReactComponent as Down } from "./down.svg";
import db from "../../firebase";
import { get } from "../../../auth0/http";
import { API_ROOT } from "../../../auth0/api_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ name, email }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const chatRoom = db.ref().child("chatrooms").child("global");
  const messagesEndRef = useRef(null);
  const messagesDivRef = useRef(null);

  const [profile, setProfile] = useState({});

  function scrolledToBottom(el) {
    return el.scrollHeight - el.scrollTop - el.clientHeight === 0;
  }
  const scrollToBottom = () => {
    if (messagesEndRef.current && !scrolled) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    get(`${API_ROOT}user_info`).then((res) => {
      if (res) {
        setProfile({
          name: res.name,
          email: res.email,
        });
      }
    });
  }, []);

  useEffect(scrollToBottom, [messages]);
  useEffect(scrollToBottom, []);
  useEffect(() => {
    const handleNewMessages = (data) => {
      if (data.val()) {
        const size = parseInt(window.localStorage.getItem("size"));
        let msgs = JSON.parse(window.localStorage.getItem("messages")) || [];
        if (msgs.length) {
          if (
            data.val().timestamp === msgs[msgs.length - 1 || 0].timestamp &&
            data.val().email === msgs[msgs.length - 1].email
          ) {
            msgs = msgs.slice(0, msgs.length - 1);
            console.log(msgs);
          }
        }
        if (size < 200) {
          window.localStorage.setItem("size", JSON.stringify(size + 1));
          window.localStorage.setItem("last", data.val().timestamp);
          window.localStorage.setItem(
            "messages",
            JSON.stringify([...msgs, data.val()])
          );
          setMessages((old) => {
            return [...msgs, data.val()];
          });
        } else {
          window.localStorage.setItem("last", data.val().timestamp);
          const newMessages = msgs.slice(msgs.length / 2);
          window.localStorage.setItem(
            "size",
            JSON.stringify(newMessages.length + 1)
          );
          window.localStorage.setItem(
            "messages",
            JSON.stringify([...newMessages, data.val()])
          );
          setMessages((old) => {
            return [...newMessages, data.val()];
          });
        }
      }
    };
    const size = window.localStorage.getItem("size");
    const cacheClearances = window.localStorage.getItem("cacheClearances");
    db.ref()
      .child("blast-local")
      .once("value", (data) => {
        console.log(cacheClearances);
        if (
          cacheClearances === null ||
          data.val() > parseInt(cacheClearances)
        ) {
          console.log(cacheClearances);
          window.localStorage.removeItem("size");
          window.localStorage.removeItem("last");
          window.localStorage.removeItem("messages");
          window.localStorage.setItem(
            "cacheClearances",
            JSON.stringify(data.val())
          );
        }
      });
    if (size === 0 || size === null) {
      chatRoom.endAt().limitToLast(100).on("child_added", handleNewMessages);
    } else {
      setMessages(JSON.parse(window.localStorage.getItem("messages")));
      chatRoom
        .orderByChild("timestamp")
        .startAt(parseInt(window.localStorage.getItem("last")))
        .on("child_added", handleNewMessages);
    }
    return () => {
      chatRoom.off("child_added", handleNewMessages);
    };
    // eslint-disable-next-line
  }, []);

  const handleMsgChange = (e) => setMsg(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      chatRoom.push({
        sender: profile.name || "",
        email: profile.email || "",
        msg,
        timestamp: Date.now(),
      });
      setMsg("");
    }
  };

  const handleClick = (e) => {
    chatRoom.push({
      sender: profile.name || "",
      email: profile.email || "",
      msg,
      timestamp: Date.now(),
    });
    setMsg("");
  };

  return (
    <div className="chatApp">
      <div className="chat">
        <div
          className="messages"
          ref={messagesDivRef}
          onWheel={(e) => {
            console.log(scrolledToBottom(messagesDivRef.current));
            if (scrolledToBottom(messagesDivRef.current)) {
              setScrolled(false);
            } else {
              setScrolled(true);
            }
          }}
          onTouchMove={(e) => {
            console.log(scrolledToBottom(messagesDivRef.current));
            if (scrolledToBottom(messagesDivRef.current)) {
              setScrolled(false);
            } else {
              setScrolled(true);
            }
          }}
        >
          {messages.map((message) => {
            // console.log(message);
            if (message["email"] === profile.email)
              return (
                <div className="my-message">
                  {/*<span id="me">{message["sender"]} :</span>*/}
                  {/*<br />*/}
                  <div className={"msg-text"}>{message["msg"]}</div>
                </div>
              );
            else
              return (
                <div className="message">
                  <span id="sender">{message["sender"]}</span>
                  <br />
                  <div className={"msg-text"}>{message["msg"]}</div>
                </div>
              );
          })}
          <div ref={messagesEndRef} />
        </div>
        {scrolled ? (
          <Down
            id="scroll-icon"
            onClick={(e) => {
              messagesEndRef.current.scrollIntoView();
              setScrolled(false);
            }}
          />
        ) : (
          ""
        )}
        <div className={"chat-input"}>
          <input
            placeholder="Enter your message"
            onChange={handleMsgChange}
            onKeyDown={handleKeyDown}
            value={msg}
          />
          <FontAwesomeIcon
            onClick={handleClick}
            className={"msg-icon"}
            icon={faPaperPlane}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
