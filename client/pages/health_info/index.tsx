import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import Layout from "../../components/layout/Layout";
import CreateIcon from "@mui/icons-material/Create";
import EditIcon from "@mui/icons-material/Edit";
import Head from "next/head";
const StyledMedicineManagementContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
`;
const index = () => {
  return (
    <Layout>
      <Head>
        <title>Quản lý thuốc tiêm</title>
      </Head>
      <StyledMedicineManagementContainer>
        <ChoosenBox
          boxSize={180}
          href="/health_info/create"
          icon={
            <>
              <CreateIcon />
            </>
          }
          title="Tạo phiếu siêu âm"
        />
        <ChoosenBox
          boxSize={180}
          href="/health_info/list"
          icon={
            <>
              <EditIcon />
            </>
          }
          title="Lịch sử siêu âm"
        />
      </StyledMedicineManagementContainer>
    </Layout>
  );
};

export default index;
