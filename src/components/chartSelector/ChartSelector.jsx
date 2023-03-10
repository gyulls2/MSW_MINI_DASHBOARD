import React, { useState } from "react";
import styled from "styled-components";

const ChartSelector = ({ title, chartSelectorHandler }) => {
  const [isVisible, setIsVisible] = useState(true);

  const setVisibleHandler = () => {
    setIsVisible(isVisible ? false : true);
    chartSelectorHandler(isVisible, title);
  };

  const changeColor = {
    color: isVisible ? "#222" : "#fff",
    backgroundColor: isVisible ? "#fff" : "#4E78E1",
  };

  return (
    <StyledDIV name={title} onClick={setVisibleHandler} style={changeColor}>
      {title}
    </StyledDIV>
  );
};

export default ChartSelector;

const StyledDIV = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 40px;
  border-radius: 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
