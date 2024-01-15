import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 16px;
  background: #266663;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;
const MyButton = ({
  children,
  onClick = () => {},
}: {
  children: any;
  onClick: () => void;
}) => {
  return <StyledButton>{children}</StyledButton>;
};

export default MyButton;
