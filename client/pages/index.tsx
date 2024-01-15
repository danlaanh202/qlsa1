import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../components/box/ChoosenBox";
import Layout from "../components/layout/Layout";
import { sidebarList } from "../components/layout/Sidebar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MyChart from "../components/chart/MyChart";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import analystManager from "../managers/api/AnalystManager";
import { ArrowDownward } from "@mui/icons-material";

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
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>({
    currentHealthInfoCount: 0,
    currentPatientCount: 0,
    previousHealthInfoCount: 0,
    previousPatientCount: 0,
    currentSummary: 0,
    previousSummary: 0,
  });
  const {
    currentHealthInfoCount,
    currentPatientCount,
    previousHealthInfoCount,
    previousPatientCount,
    currentSummary,
    previousSummary,
  } = report;
  const getReport = async () => {
    try {
      setLoading(true);
      const res = await analystManager.get(dateRange);
      setReport(res);
      setLoading(false);
    } catch (e) {
      console.log({ e });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getReport();
  }, [dateRange]);
  const downMarkup = <ArrowDownward />;
  const upMarkup = <ArrowUpwardIcon />;
  const getIcon = (prev: any, current: any) =>
    prev > current ? downMarkup : upMarkup;
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
          <Button variant="outlined" onClick={getReport}>
            {loading ? <div className="spinner"></div> : "Reload"}
          </Button>
        </div>
        <StyledReportContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Số lượt siêu âm</span>
                {getIcon(previousHealthInfoCount, currentHealthInfoCount)}
                <span>
                  {Math.abs(currentHealthInfoCount - previousHealthInfoCount)}
                </span>
              </div>
              <span className="card-item-value">{currentHealthInfoCount}</span>
            </div>
          </StyledCardContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Doanh thu</span>
                {getIcon(previousSummary, currentSummary)}
                <span>
                  {Math.abs(currentSummary - previousSummary)}
                  VND
                </span>
              </div>
              <span className="card-item-value">{currentSummary} VND</span>
            </div>
          </StyledCardContainer>
          <StyledCardContainer>
            <div className="card-item-container">
              <div className="card-item">
                <span className="card-item-label">Số bệnh nhân mới</span>
                {getIcon(previousPatientCount, currentPatientCount)}
                <span>
                  {Math.abs(currentPatientCount - previousPatientCount)}
                </span>
              </div>
              <span className="card-item-value">{currentPatientCount}</span>
            </div>
          </StyledCardContainer>
        </StyledReportContainer>
        {/* <StyledCard style={{ height: "350px" }}>
          <MyChart />
        </StyledCard> */}
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
