import React from "react";
const Like = (props) => {
  let c="text-danger"
  if(!props.liked) c="text-warning"
  return <React.Fragment><div className={c} style={{cursor:"pointer"}} onClick={props.onClick}>Like</div></React.Fragment>;

}

export default Like;
