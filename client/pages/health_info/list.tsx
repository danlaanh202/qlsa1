import Head from "next/head";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import MainTop from "../../components/MainTop";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import HealthRecordManager from "../../managers/api/HealthRecordManager";
import { useRouter } from "next/router";

const StyledListContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const list = () => {
  return (
    <Layout>
      <Head>
        <title>Danh sách phiếu siêu âm</title>
      </Head>
      <StyledListContainer>
        <MainTop
          title="Danh sách phiếu siêu âm"
          backTitle="Quản lý phiếu siêu âm"
          backRoute="/health_info"
        />
        <CardList />
      </StyledListContainer>
    </Layout>
  );
};

export default list;

const StyledCardListContainer = styled.div`
  .input-container {
    width: 100%;
    position: relative;
    display: flex;
    gap: 12px;
    align-items: center;
    .box-input {
      padding: 12px;
      width: 100%;
      outline: none;
      flex: 1;
    }
  }
  .records-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .spinner {
      width: 20px;
      height: 20px;
      right: 20px;
      border: 2px dotted black;
      border-right: 2px dotted transparent;
      border-radius: 100%;
    }
  }
`;
const StyledSelect = styled(Select)`
  max-height: 44px;
  min-width: 115px;
`;
const CardList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("patient");
  const searchQueryDebounce = useDebounce(searchQuery);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const handleGetCardList = async () => {
    setLoading(true);
    try {
      const recordList = await HealthRecordManager.get(
        searchQueryDebounce,
        type
      );
      setRecords(recordList);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCardList();
  }, [searchQueryDebounce]);
  return (
    <StyledCardListContainer>
      <div className="input-container">
        <input
          type="text"
          className="box-input"
          placeholder={`Nhập vào tên ${
            type === "patient" ? "bệnh nhân" : "bác sĩ"
          }`}
          value={searchQuery}
          onChange={(e) => {
            setLoading(true);
            setSearchQuery(e.target.value);
          }}
        />
        <StyledSelect
          onChange={(e: any) => setType(e.target.value)}
          value={type}
        >
          <MenuItem value="patient">Bệnh nhân</MenuItem>
          <MenuItem value="doctor">Bác sĩ</MenuItem>
        </StyledSelect>
      </div>
      <div className="records-container">
        {loading && <div className="spinner"></div>}
        {!loading &&
          records?.length > 0 &&
          records.map((record: any) => (
            <Card key={record.id_phieu_kham}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div>Bệnh nhân: {record.benh_nhan.ho_va_ten}</div>
                  <div>Bác sĩ: {record.bac_si.ho_va_ten}</div>
                  <div>Ngày khám: {record.createdAt}</div>
                  <div>Kết luận: {record.ket_luan}</div>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    router.push(`/health_info/${record.id_phieu_kham}`)
                  }
                >
                  Chi tiết
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </StyledCardListContainer>
  );
};
