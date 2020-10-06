import React, { useEffect, useState } from "react";
// import "./chatroom.scss";
// import dp from "../Images/86983090_2869925253099734_1051076469830189056_o.jpg";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

function Members(props) {
  return props.User.map((a, i) => {
    console.log(a.uid)

    return a.uid !== props.you.uid ?  (
      
      <div onClick={() => props.check(a)} className="CurrentUsers">
        <img className="dp" style={{ backgroundImage: `url(${a.dp})` }} />
        <div >{a.name}</div>
      </div>
    ) : null;
  });
}

export default withRouter(Members);
