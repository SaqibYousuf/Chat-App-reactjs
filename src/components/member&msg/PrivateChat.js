import React, { useEffect, useState } from "react";
// import "./chatroom.scss";
// import dp from "../Images/86983090_2869925253099734_1051076469830189056_o.jpg";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
function PrivateChat(props) {
  // let [pMsg, setpMsg] = useState([])
  // console.log(props.privateChat.uid);
  // let []
  // console.log(pMsg)
  return props.pvtMsg.map((a, i) => {
    //    let a = Object.values(b)[0];
    //    console.log(props.privateChat.uid)
    //    console.log(Object.values(props.pvtMsg))
    // setpMsg(a)
    // console.log(a.uid)
    // console.log(props.id);
    console.log(props.privateChat.uid, props.you.uid, a);
    // let first = a.uid;
    // let second = props.privateChat.uid;

    console.log(props.you.uid);
    return (a.reciever === props.privateChat.uid ||
      a.uid === props.privateChat.uid) &&
      (a.reciever === props.you.uid || a.uid === props.you.uid) ? (
      a.uid === props.you.uid ? (
        <div className="messege">
          <div className="sending">
            <h6>{a.name}</h6>
            <p>{a.msg} </p>
          </div>
        </div>
      ) : (
        <div className="messege">
          <div className="recieved">
            <h6>{a.name}</h6>
            <p>{a.msg} </p>
          </div>
        </div>
      )
    ) : null;

    // }
    //   <div className="messege">
    //     <div className="sending">
    //       <h6>Name Name send</h6>
    //       <p>sad sad sad weq sad vxac asd wqe qesa dasfs asc </p>
    //     </div>
    //   </div>
  });
}

export default withRouter(PrivateChat);
