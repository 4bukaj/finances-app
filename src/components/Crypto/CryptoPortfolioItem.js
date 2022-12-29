import React from "react";
import "./CryptoPortfolioItem.css";

export default function CryptoPortfolioItem({ coin, amount, value, image }) {
  return (
    <div className="coins-list-item">
      <div className="coin-holder">
        <img src={image} alt={coin} />
        &nbsp;
        <span className="bold">{coin}</span>
      </div>
      <div>{amount}</div>
      <div>{value + " zł"}</div>
    </div>
  );
}
