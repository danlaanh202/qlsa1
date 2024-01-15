import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";

import CreatePaperForm from "../../components/form/CreatePaperForm";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import InputBox from "../../components/box/InputBox";
import { IDoctor, IMedicine, IPatient } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import useSnackbar from "../../hooks/useSnackbar";
import PatientManager from "../../managers/api/PatientManager";
import DoctorManager from "../../managers/api/DoctorManager";
import HealthRecordManager from "../../managers/api/HealthRecordManager";
import FormInput from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRow from "../../components/form/FormRow";

const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
  .step-container {
    width: 100%;
  }
  .paper-info-container {
    margin-top: 20px;
    .item {
      font-size: 16px;
      margin-top: 8px;
      label {
        font-weight: 600;
      }
      .item-content {
      }
    }
  }
`;
const CreateHealthInfo = () => {
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryDebounce = useDebounce(searchQuery);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>();
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setCurrent((current) => current + 1);
    setSearchQuery("");
  };
  const handleCreatePaper = async (data: any) => {
    setLoading(true);
    try {
      await HealthRecordManager.create({
        ...data,
        id_bac_si: selectedDoctor.id_bac_si,
        id_benh_nhan: selectedPatient.id_benh_nhan,
      });
      handleShow("Tạo phiếu thành công");
    } catch (error) {
      handleShow("Tạo phiếu thất bại");
    } finally {
      setLoading(false);
    }
  };
  const handleGetPatients = async (searchQuery: any) => {
    setLoading(true);
    try {
      const patients = await PatientManager.search(searchQuery);
      setPatients(patients);
    } catch (e) {
      handleShow("Không lấy được dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  const handleGetDoctors = async (searchQuery: any) => {
    setLoading(true);
    try {
      const doctors = await DoctorManager.search(searchQuery);
      setDoctors(doctors);
    } catch (e) {
      handleShow("Không lấy được dữ liệu");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchQuery !== "") {
      setLoading(true);
    }
    if (current === 0) {
      handleGetPatients(searchQueryDebounce);
    }
    if (current === 1) {
      handleGetDoctors(searchQueryDebounce);
    }
  }, [current, searchQueryDebounce]);
  return (
    <Layout>
      <Head>
        <title>Thêm phiếu siêu âm</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Thêm phiếu siêu âm"
          backTitle="Quản lý phiếu siêu âm"
          backRoute="/health_info"
        />
        <div className="step-container">
          <Steps
            size="small"
            current={current}
            items={[
              {
                title: "Chọn bệnh nhân",
              },
              {
                title: "Chọn bác sĩ",
              },
              {
                title: "Hoàn thành phiếu siêu âm",
              },
            ]}
          />
          <div className="step-content-container">
            {current === 0 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedPatient}
                dropdownData={patients}
                nextStep={nextStep}
                type="patient"
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {current === 1 && (
              <InputBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectItem={setSelectedDoctor}
                dropdownData={doctors}
                nextStep={nextStep}
                type="doctor"
                loading={loading}
                setLoading={setLoading}
              />
            )}

            {current === 2 && (
              <>
                <div className="paper-info-container">
                  <div className="item">
                    <label htmlFor="">Tên bệnh nhân:</label>{" "}
                    <span className="item-content">
                      {selectedPatient?.ho_va_ten}
                    </span>
                  </div>
                  <div className="item">
                    <label htmlFor="">Tên bác sĩ:</label>{" "}
                    <span className="item-content">
                      {selectedDoctor?.ho_va_ten}
                    </span>
                  </div>
                </div>

                <CreatePaperForm
                  loading={loading}
                  createPaper={handleCreatePaper}
                />
              </>
            )}
          </div>
        </div>
      </StyledCreateContainer>
    </Layout>
  );
};

export default CreateHealthInfo;
