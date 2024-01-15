import Head from "next/head";
import styled from "styled-components";
import ChoosenBox from "../../components/box/ChoosenBox";
import Layout from "../../components/layout/Layout";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;
const index = () => {
  return (
    <Layout>
      <Head>
        <title>Thống kê</title>
      </Head>
      <StyledContainer></StyledContainer>
    </Layout>
  );
};

export default index;
