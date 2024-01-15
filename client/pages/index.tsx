import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../components/box/ChoosenBox";
import Layout from "../components/layout/Layout";
import { sidebarList } from "../components/layout/Sidebar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MyChart from "../components/chart/MyChart";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import AnalystManager from "../managers/api/AnalystManager";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  margin-top: 80px;

  .navigate-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .select-container {
    display: flex;
    gap: 12px;
    .MuiInputBase-root {
      height: 34px;
      background: #ffffff;
    }
    .MuiButtonBase-root {
      background: #ffffff;
      border: 1px solid #c4c4c4;
    }
  }
`;
const StyledReportContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 20px;
`;
const StyledCard = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 20px;
  .card-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 12px;
  }
`;
const StyledCardContainer = styled.div`
  flex: 1;
  .card-item-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .card-item {
      display: flex;
      align-items: center;
      gap: 4px;
      .card-item-label {
        font-weight: 600;
      }
    }
  }
`;
const Dashboard = () => {
  const [dateRange, setDateRange] = useState<any>("this_week");
  const getReport = async () => {
    try {
      console.log(await AnalystManager.get(dateRange));
    } catch (e) {}
  };
  useEffect(() => {
    getReport();
  }, [dateRange]);
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <StyledContainer>
        <div className="select-container">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dateRange}
            label="Age"
            onChange={(e) => setDateRange(e.target.value)}
          >
            <MenuItem value={"this_week"}>This week</MenuItem>
            <MenuItem value={"this_month"}>This month</MenuItem>
          </Select>
          <Button variant="outlined">Reload</Button>
        </div>
        <StyledReportContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Số lượt siêu âm</span>
                <ArrowUpwardIcon />
                <span>30%</span>
              </div>
              <span className="card-item-value">165</span>
            </div>
          </StyledCardContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Doanh thu</span>
                <ArrowUpwardIcon />
                <span>30%</span>
              </div>
              <span className="card-item-value">165</span>
            </div>
          </StyledCardContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Số bệnh nhân mới</span>
                <ArrowUpwardIcon />
                <span>30%</span>
              </div>
              <span className="card-item-value">165</span>
            </div>
          </StyledCardContainer>
        </StyledReportContainer>
        <StyledCard style={{ height: "350px" }}>
          <MyChart />
        </StyledCard>
        <StyledCard>
          <div className="card-title">Điều hướng</div>
          <div className="navigate-container">
            {sidebarList.map(
              (item, index) =>
                index !== 0 && (
                  <ChoosenBox
                    key={item.title}
                    title={item.title}
                    href={item.link}
                    icon={item.icon}
                    boxSize={160}
                  />
                )
            )}
          </div>
        </StyledCard>
      </StyledContainer>
    </Layout>
  );
};

export default Dashboard;
