import React from "react";


export default function TopRowItem(props) {

    return (
    <>
      <div className="home__top-row icon-container">
        {props.icon}
      </div>
      <div className="home__top-row titles">
        <div className="home__top-row main-title">$ {props.mainTitle}</div>
        <div className="home__top-row sub-title">{props.subTitle}</div>
      </div>
    </>
  );
}
