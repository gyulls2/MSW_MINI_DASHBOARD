import React, { useEffect, useState } from "react";

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
  }, []);

  return <div>{valueData.value}</div>
};

export default ValueChart;
