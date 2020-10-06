import React, { useEffect, useState } from "react";
// import "./chatroom.scss";
// import dp from "../Images/86983090_2869925253099734_1051076469830189056_o.jpg";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

function Messeges(props) {
//   console.log(props.you.uid);
  // let []
  return props.msg.map((a, i) => {
    // console.log(a);

    return a.uid === props.you.uid ? (
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
    );

    // }
    //   <div className="messege">
    //     <div className="sending">
    //       <h6>Name Name send</h6>
    //       <p>sad sad sad weq sad vxac asd wqe qesa dasfs asc </p>
    //     </div>
    //   </div>
  });
}

export default withRouter(Messeges);
