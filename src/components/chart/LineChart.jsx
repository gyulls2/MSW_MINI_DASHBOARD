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
    fetch(`/timeseries?from=${from}&to=${to}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad request body.");
        }
        return response.json();
      })
      .then((data) => {
        setLineData({
          name: data.name,
          unit: data.unit,
          data: data.data,
          times: data.times,
        });
        // 서버로부터 받은 데이터 처리
        console.log(`Name: ${data.name}`);
        console.log(`Unit: ${data.unit}`);
        console.log(`Data: ${data.data}`); // 시계열 데이터 배열
        console.log(`Times: ${data.times}`); // Unix Time 배열
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: lineData.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h1>왜 안돼~~</h1>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
