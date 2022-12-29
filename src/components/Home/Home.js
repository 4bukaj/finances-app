import React, { useState, useEffect } from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Expences from "../Expences/Expences";
import HomePieChart from "../Charts/HomePieChart";

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
            {filteredTransactions.length > 0 ? (
              <HomePieChart expenses={filteredTransactions} />
            ) : (
              <div className="noTransactions">
                <h3>No transactions found!</h3>
              </div>
            )}
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
