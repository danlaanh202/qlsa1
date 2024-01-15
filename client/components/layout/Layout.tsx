import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

const StyledLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  .main-container {
    height: 100%;
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    /* margin-top: 60px; */
  }
`;
const Layout = ({ children }: { children: ReactNode }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  return (
    <StyledLayout>
      <>
        <Sidebar isShowSidebar={isShowSidebar} />
        <Main>
          <>
            <Header setIsShowSidebar={setIsShowSidebar} />
            <div className="main-container">{children}</div>
          </>
        </Main>
      </>
    </StyledLayout>
  );
};

export default Layout;
