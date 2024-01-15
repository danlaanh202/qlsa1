import { ReactNode } from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  background: #f1f1f1;
  height: 100%;
  flex: 1;
  position: relative;
`;
const Main = ({ children }: { children: ReactNode }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
