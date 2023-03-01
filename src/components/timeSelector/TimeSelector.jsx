import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const TimeSelector = ({ timeSelectorHandler }) => {
  const marks = [
    {
      value: 0,
      label: "10분",
    },
    {
      value: 50,
      label: "30분",
    },
    {
      value: 100,
      label: "1시간",
    },
  ];

  function getTimeValue(e) {
    // 분 -> 초로 변환해서 timeSelectorHandler의 매개변수로 넘겨준다
    if (e.target.value === 100) return timeSelectorHandler(3600);
    else if (e.target.value === 50) return timeSelectorHandler(1800);
    else return timeSelectorHandler(600);
  }

  return (
    <div>
      <Box sx={{ width: "95%", marginBottom: "60px" }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={100}
          step={null}
          marks={marks}
          onChange={getTimeValue}
        />
      </Box>
    </div>
  );
};

export default TimeSelector;
