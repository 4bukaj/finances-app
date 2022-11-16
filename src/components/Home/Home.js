import React, { useState, useEffect } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopRowItem from "./TopRowItem";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PercentIcon from "@mui/icons-material/Percent";
import Expences from "../Expences/Expences";
import HomeChart from "../Charts/HomeChart";
import HomePieChart from "../Charts/HomePieChart"

const topRowItems = [
  { icon: <SavingsIcon />, mainTitle: "100", subTitle: "Your savings" },
  {
    icon: <ShoppingCartCheckoutIcon />,
    mainTitle: 2137,
    subTitle: "Spent this month",
  },
  { icon: <PercentIcon />, mainTitle: 33, subTitle: "Idk" },
];

export default function Home() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleImportFilteredTransactions = (uploadedTransactions, filter) => {
    setFilteredTransactions(uploadedTransactions);
    setSelectedFilter(filter);
  };

  return (
    <Container fluid className="home-container">
      <Row>
        {/* --------------FIRST COLUMN------------------------------- */}
        <Col
          className="red"
          xl={{ span: 7, order: "first" }}
          lg={{ span: 12, order: "last" }}
        >
          <Row>
            {/* <HomeChart
              expenses={filteredTransactions}
              selectedFilter={selectedFilter}
            /> */}
            <HomePieChart expenses={filteredTransactions}/>
          </Row>
        </Col>
        {/* --------------SECOND COLUMN------------------------------- */}
        <Col className="red" xl={{ span: 5 }} lg={{ span: 12 }}>
          <Row>
            <Expences onFilterChange={handleImportFilteredTransactions} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
