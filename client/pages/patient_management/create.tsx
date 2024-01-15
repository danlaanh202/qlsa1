import Head from "next/head";
import Layout from "../../components/layout/Layout";
import styled from "styled-components";
import MainTop from "../../components/MainTop";
import CreatePatientForm from "../../components/form/CreatePatientForm";

const StyledCreateContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  max-width: 935px;
  margin: 60px auto 0;
`;
const CreatePatient = () => {
  return (
    <Layout>
      <Head>
        <title>Thêm bệnh nhân</title>
      </Head>
      <StyledCreateContainer>
        <MainTop
          title="Thêm bệnh nhân"
          backTitle="Quản lý bệnh nhân"
          backRoute="/patient_management"
        />
        <CreatePatientForm />
      </StyledCreateContainer>
    </Layout>
  );
};

export default CreatePatient;
