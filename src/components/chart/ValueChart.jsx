import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

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

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
    >
      <div className="chartContainer">
        <div className="handle">{valueData.value}Mib</div>
      </div>
    </Draggable>
  );
};

export default ValueChart;
