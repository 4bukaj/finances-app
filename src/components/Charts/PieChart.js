import React from "react";
import "./ChartsDashboard.css";
import { PieChart } from "react-minimal-pie-chart";

export default function Charts(props) {

  return (
    <div className="outter-outline">
      <PieChart
        data={props.dataPoints}
        lineWidth={50}
        startAngle={55}
        paddingAngle={2}
        animate={true}
        label={({ dataEntry }) => dataEntry.value + " zł"}
        labelStyle={{
          fontSize: "3px",
          fontWeight: "bold",
        }}
        labelPosition={75}
      />
    </div>
  );
}
