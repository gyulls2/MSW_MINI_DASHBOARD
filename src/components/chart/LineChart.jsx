import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Draggable from "react-draggable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ from, to }) => {
  const [lineData, setLineData] = useState({});

  useEffect(() => {
    const fetchLineData = async () => {
      fetch(`/timeseries?from=${from}&to=${to}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request body.");
          }
          return response.json();
        })
        .then((data) => {
          // 서버로부터 받은 데이터 처리
          setLineData({
            name: data.name,
            unit: data.unit,
            data: data.data,
            times: data.times,
          });
          console.log(`Name: ${data.name}`);
          console.log(`Unit: ${data.unit}`);
          console.log(`Data: ${data.data}`); // 시계열 데이터 배열
          console.log(`Times: ${data.times}`); // Unix Time 배열
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    fetchLineData();
  }, [from, to]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: lineData.name,
      },
      // 툴팁 수정하기
      tooltips: {
        callbacks: {
          title: function title(tooltipItem, data) {
            var title = data.labels[tooltipItem.index];
            return title;
          },
        },
      },
    },
  };

  const labels =
    lineData &&
    lineData?.times?.map((item) => timeFormat(new Date(item * 1000)));

  function timeFormat(date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return hour + ":" + minute + ":" + second;
  }

  const data = {
    labels,
    datasets: [
      {
        label: lineData.name,
        data: lineData.data,
        borderColor: "rgb(79, 121, 225)",
        backgroundColor: "rgba(79, 121, 225, 0.5)",
      },
    ],
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
    >
      <div className="chartContainer line">
        <div className="handle">
          <Line options={options} data={data} />
        </div>
      </div>
    </Draggable>
  );
};

export default LineChart;
