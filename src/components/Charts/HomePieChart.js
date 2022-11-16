import React, { useState, useEffect } from "react";
import "./HomePieChart.css";
import PieChart from "../Charts/PieChart";
import { categoriesList } from "../Expences/ExpencesCategories";

export default function HomePieChart(props) {
  const chartDataPoints = [];
  const [hideDetails, setHideDetails] = useState(false);
  let totalSum = 0;

  //CREATE ARRAY OF CATEGORIES WITH NULL VALUES
  for (const category of categoriesList) {
    chartDataPoints.push({
      title: category.id,
      value: 0,
      color: category.color,
    });
  }

  //FIND CATEGORIES AND ASSIGN VALUES FROM EXPENSES
  for (const expense of props.expenses) {
    chartDataPoints.find((category) => {
      return category.title === expense.category;
    }).value += Number(Number(expense.amount).toFixed(2));
    totalSum += Number(Number(expense.amount).toFixed(2));
  }

  //REMOVE CATEGORIES WITH 0 VALUE
  const filteredChartDataPoints = chartDataPoints.filter(function (element) {
    return element.value > 0;
  });

  //HIDE DETAILS OF CHART WHEN NO TRANSACTIONS
  useEffect(() => {
    if(filteredChartDataPoints.length > 0) setHideDetails(true);
    else setHideDetails(false);
  },[filteredChartDataPoints])

  return (
    <div className="homie-piechart__contaier">
      <PieChart dataPoints={filteredChartDataPoints} />
      {hideDetails && (
        <div className="total-sum__container">
          <span className="total-sum__title">{totalSum} zł</span>
          <span className="total-sum__subtitle">Total spent</span>
        </div>
      )}
    </div>
  );
}
