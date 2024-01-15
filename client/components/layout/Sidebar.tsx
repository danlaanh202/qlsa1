import { ReactNode } from "react";
import styled from "styled-components";
import SidebarItem from "../sidebar/SidebarItem";
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from "@mui/icons-material/Medication";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AnalyticsIcon from "@mui/icons-material/Analytics";
// import IdcardOutlined from "@mui/icons-material/IdcardOutlined";
import { SetStateType } from "../../types";
const StyledSidebar = styled.div`
  width: 300px;
  height: 100%;
  padding: 28px 20px;
  background: white;
  border-right: 1px solid #e9e9e9;
  .logo-container {
    font-size: 24px;
    line-height: 30px;
    color: #282423;
    text-align: center;
    margin-bottom: 40px;
  }
`;
interface ISidebarList {
  title: string;
  link: string;
  icon: ReactNode;
  isExact?: boolean;
}
export const sidebarList: ISidebarList[] = [
  {
    title: "Trang chủ",
    link: "/",
    isExact: true,
    icon: (
      <>
        <HomeIcon />
      </>
    ),
  },
  {
    title: "Quản lý bệnh nhân",
    link: "/patient_management",
    icon: (
      <>
        <AirlineSeatFlatIcon />
      </>
    ),
  },
  {
    title: "Quản lý siêu âm",
    link: "/health_info",
    icon: (
      <>
        <ReceiptIcon />
      </>
    ),
  },
  {
    title: "Quản lý bác sĩ",
    link: "/doctor_management",
    icon: (
      <>
        <MedicationIcon />
      </>
    ),
  },
];
const Sidebar = ({ isShowSidebar }: { isShowSidebar: boolean }) => {
  return isShowSidebar ? (
    <StyledSidebar>
      {/* <div className="logo-container">TTSA</div> */}
      {sidebarList.map((item, index) => (
        <SidebarItem
          itemTitle={item.title}
          link={item.link}
          icon={item.icon}
          isExact={!!item.isExact}
          key={item.title}
        />
      ))}
    </StyledSidebar>
  ) : (
    <></>
  );
};

export default Sidebar;
