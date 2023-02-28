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
        console.log(`value Name: ${data.name}`);
        console.log(`Value: ${data.value}`);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [from, to]);

  // styled-components
  const StyledP = styled.p`
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  `;

  const Span = styled.span`
    font-size: 5rem;
    color: ${valueData.value >= 500 ? "#E9533D" : "#222"};
  `;

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
    >
      <div className="chartContainer value">
        <div className="handle">
          <StyledP>
            <Span>{valueData.value}</Span> Mib
          </StyledP>
        </div>
      </div>
    </Draggable>
  );
};

export default ValueChart;
