import React, { useEffect, useState } from "react";
import "./chatroom.scss";
import dp from "../Images/86983090_2869925253099734_1051076469830189056_o.jpg";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
import Member from "../member&msg/Member";
import Messages from "../member&msg/Messages";
import PrivateChat from "../member&msg/PrivateChat";

function ChatRoom(props) {
  // console.log(firebase)
  let [User, setUser] = useState("");
  let [you, setYou] = useState("");
  let [dp, setDp] = useState("");
  let [group, setGroup] = useState("");
  let [message, setMessage] = useState("");
  let [msg, setMsg] = useState("");
  let [privateChat, setPrivateChat] = useState("");
  let [pvtMsg, setPvtMsg] = useState("");
  let [id, setID] = useState("");
  //   console.log(message)
  //   let [members,setMembers] = useState("")
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref("Users")
          .on("value", function (data) {
            setUser(Object.values(data.val()));
            setYou(user);
          });
        setDp(user.photoURL);
        console.log(user);
        firebase
          .database()
          .ref("Messeges")
          .on("value", function (data) {
            // console.log(data.val());
            if (data.val()) {
              setMsg(Object.values(data.val()));
            } else {
              setPvtMsg([]);
            }
          });

        //   document.getElementById("dp").style.backgroundImage=;
      } else if (!user) {
        props.history.push("/");
        //   User = user
      }
    });
  }, []);
  console.log(pvtMsg);
  function getPVTMes(id) {
    firebase
      .database()
      .ref("PrivateMesseges")
      .on("value", function (data) {
        if (data.val()) {
          setPvtMsg(Object.values(data.val()));
        } else {
          setPvtMsg([]);
        }
      });
    // console.log(uid)
    setID(id);
  }
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        //   firebase.database().ref('Users').child(User.uid).remove()
        props.history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  function send() {
    // console.log(!group);
    if (message === "" || !group) {
      return;
    }
    let msgObj = {
      uid: you.uid,
      msg: message,
      name: you.displayName,
    };
    firebase
      .database()
      .ref("Messeges")
      .push(msgObj)
      .then(() => {
        setMessage("");
      });
  }
  function check(a) {
    setPrivateChat(a);
    getPVTMes(a.uid);
    setGroup("false");
    // console.log(a.uid)
    // console.log(group)
  }
  function pvtSend() {
    console.log("private send");
    if (message === "") {
      return;
    }
    let pvtMsgObj = {
      uid: you.uid,
      msg: message,
      name: you.displayName,
      reciever: privateChat.uid,
    };
    firebase
      .database()
      .ref("PrivateMesseges")
      .push(pvtMsgObj)
      .then(() => {
        setMessage("");
      });
  }
  function groupChat() {
    setGroup("True");
    console.log(group);
  }
  console.log(privateChat);
  return (
    <div className="mainDiv">
      <div className="ChatBody">
        <div className="members">
          <div className="User">
            <div>
              <img
                id="dp"
                className="dp"
                style={{ backgroundImage: `url(${dp})` }}
              />
            </div>
            <div className="yourName">
              <div>{you.displayName}</div>
              <div className="Online">
                <i class="OnlineIcon fas fa-circle"></i>Online
              </div>
            </div>
          </div>
          <div id="onlineUsers" className="onlineUsers">
            <div onClick={() => groupChat()} className="GroupChat">
              <div>Join Group Chat</div>
              <div>
                <i class="fas fa-users"></i>
              </div>
            </div>
            <div id="currentUserDiv" className="currentUserDiv">
              {User.length ? (
                <Member User={User} check={check} you={you} />
              ) : null}
            </div>
          </div>
          <div onClick={() => logOut()} className="LogOut">
            <p>Logout</p>
            <i class="LogOutIcon fas fa-sign-out-alt"></i>
          </div>
        </div>
        <div className="Chat">
          {/* {group ? (
            <div className="chatUser">
              <img className="dp" />

              <div className="nameOnline">
                <div>Group Chat</div>
                <div>
                  <i class="OnlineIcon fas fa-circle"></i>Online
                </div>
              </div>
            </div>
          ) :  */}
          <div className="chatUser">
            {group === "True" ? (
              <img className="dp" />
            ) : (
              <img
                className="dp"
                style={{ backgroundImage: `url(${privateChat.dp})` }}
              />
            )}

            <div className="nameOnline">
              {group === "True" ? (
                <div>
                  <div>Group Chat</div>
                  <div>
                    <i class="OnlineIcon fas fa-circle"></i>Online
                  </div>
                </div>
              ) : (
                <div>
                  <div>{privateChat.name}</div>
                  <div>
                    <i class="OnlineIcon fas fa-circle"></i>Online
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* } */}
          <div className="chatMsg">
            {group === "True" && msg.length ? (
              <Messages msg={msg} you={you} group={group} />
            ) : (
              [
                group !== "True" && pvtMsg.length && privateChat ? (
                  <PrivateChat
                    pvtMsg={pvtMsg}
                    you={you}
                    privateChat={privateChat}
                    id={id}
                  />
                ) : null,
              ]
            )}
          </div>
          <div className="chatInput">
            <input
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              type="text"
              placeholder="Type Messege Here"
            />
            {group === "True" ? (
              <button onClick={() => send()}>Send</button>
            ) : (
              [
                group === "false" ? (
                  <button onClick={() => pvtSend()}>Send</button>
                ) : (
                  <button disabled>Send</button>
                ),
              ]
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChatRoom);
