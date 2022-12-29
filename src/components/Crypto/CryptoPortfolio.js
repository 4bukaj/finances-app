import React, { useState, useEffect } from "react";
import "./CryptoPortfolio.css";
import CryptoPortfolioItem from "./CryptoPortfolioItem";

export default function CryptoPortfolio({ crypto }) {
  const portfolio = [];

  crypto.forEach((coin) => {
    console.log(portfolio[coin.coin]);
    //     if (!portfolio[coin.coin]) {
    //       portfolio[coin.coin] = {
    //         coin: coin.coin,
    //         amount: Number(coin.amount),
    //         value: Number(coin.value),
    //         image: coin.image,
    //       };
    //     } else {
    //       portfolio[coin.coin].value += Number(coin.value);
    //       portfolio[coin.coin].amount += Number(coin.amount);
    //     }
  });

  console.log(portfolio.length);

  return (
    <div className="coins-portfolio">
      <div className="coins-portfolio-header">
        <div>Crypto</div>
        <div>Total amount</div>
        <div>Avg. rate</div>
        <div>PNL</div>
      </div>
      {portfolio.length > 0 ? (
        portfolio.map((coin) => {
          return (
            <CryptoPortfolioItem
              key={coin.coin}
              coin={coin.coin}
              amount={coin.amount}
              value={coin.value}
              image={coin.image}
            />
          );
        })
      ) : (
        <span className="transactions-error">No transactions found!</span>
      )}
    </div>
  );
}
