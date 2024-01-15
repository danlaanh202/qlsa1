import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import MainTop from "../../components/MainTop";
import { useRouter } from "next/router";
import HealthRecordManager from "../../managers/api/HealthRecordManager";
import { calculateAge } from "../../utils/date";
import MyButton from "../../components/button/MyButton";

const StyledHealthInfoDetailContainer = styled.div`
  margin-top: 80px;
`;
const StyledCard = styled.div`
  width: 100%;
  padding: 20px;
  background: white;
  margin-bottom: 20px;
  position: relative;
  .button-container {
    position: absolute;
    right: 30px;
  }
  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .card-result-container {
    display: flex;
    .card-left {
      flex: 1;
      &-result {
        min-height: 150px;
      }
    }
  }
  .card-img-container {
    width: 300px;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;

const HealthInfoDetail = () => {
  const router = useRouter();
  const [healthInfo, setHealthInfo] = useState<any>({});
  const { benh_nhan: benhNhan = {}, bac_si: bacSi = {} } = healthInfo;
  const getHealthInfo = async () => {
    try {
      const data = await HealthRecordManager.getByPK(router.query.id);
      setHealthInfo(data);
    } catch (e) {}
  };
  const handlePrint = () => {};
  useEffect(() => {
    getHealthInfo();
  }, []);
  return (
    <Layout>
      <Head>
        <title>Chi tiết</title>
      </Head>
      <StyledHealthInfoDetailContainer>
        <MainTop
          title="Thêm phiếu siêu âm"
          backTitle="Quản lý phiếu siêu âm"
          backRoute="/health_info"
        />
        <StyledCard>
          <div className="button-container">
            <MyButton onClick={handlePrint}>In phiếu</MyButton>
          </div>
          <div className="card-title">Thông tin bệnh nhân</div>
          <div>Họ và tên: {benhNhan.ho_va_ten}</div>
          <div>Tuổi: {calculateAge(benhNhan.ngay_sinh)}</div>
          <div>Địa chỉ: {benhNhan.dia_chi}</div>
          <div>Số CCCD: {benhNhan.can_cuoc}</div>
          <div>BS chỉ định: {bacSi.ho_va_ten}</div>
        </StyledCard>
        <StyledCard>
          <div className="card-title">Chẩn đoán</div>
          <div className="card-result-container">
            <div className="card-left">
              <p className="card-left-result">Kết quả: {healthInfo.ket_qua}</p>
              <p className="">Kết luận: {healthInfo.ket_luan}</p>
            </div>
            <div className="card-img-container">
              <img
                src={
                  healthInfo.hinh_sieu_am ||
                  "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/sieu_am_thai_nhi_2_tuan_tuoi_duoc_khong_3_e6b7e27289.png"
                }
                alt=""
              />
            </div>
          </div>
        </StyledCard>
      </StyledHealthInfoDetailContainer>
    </Layout>
  );
};

export default HealthInfoDetail;
