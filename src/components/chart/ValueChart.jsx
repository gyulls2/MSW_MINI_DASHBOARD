import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const ValueChart = ({ from, to }) => {
  const [valueData, setValueData] = useState({});

  useEffect(() => {
    fetch(`/value?from=${from}&to=${to}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad request body.");
        }
        return response.json();
      })
      .then((data) => {
        setValueData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [from, to]);

  const spanStyle = {
    color: valueData.value >= 500 ? "#E9533D" : "#222",
    fontSize: "5rem",
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
    >
      <div className="chartContainer">
        <div className="handle">
          <StyledP>
            <span style={spanStyle}>{valueData.value}</span> {valueData.unit}
          </StyledP>
        </div>
      </div>
    </Draggable>
  );
};

export default ValueChart;

// styled-components
const StyledP = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
