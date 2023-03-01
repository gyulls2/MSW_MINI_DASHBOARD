import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Draggable from "react-draggable";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ from, to }) => {
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const fetchPieData = async () => {
      await fetch(`/pie?from=${from}&to=${to}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request body.");
          }
          return response.json();
        })
        .then((data) => {
          setPieData(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    fetchPieData();
  }, [from, to]);

  const data = {
    labels: pieData.data?.map((item) => item.name),
    datasets: [
      {
        label: pieData.data?.value,
        data: pieData.data?.map((item) => item.value),
        backgroundColor: [
          "rgba(79, 121, 225,1)",
          "rgba(74, 169, 247,1)",
          "rgba(71, 206, 237,1)",
          "rgba(74, 78, 247,1)",
          "rgba(113, 72, 237,1)",
        ],
        borderColor: [
          "rgba(79, 121, 225,1)",
          "rgba(74, 169, 247,1)",
          "rgba(71, 206, 237,1)",
          "rgba(74, 78, 247,1)",
          "rgba(113, 72, 237,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
        labels: {
          padding: 20,
        },
      },
    },
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
          <Doughnut data={data} height={400} options={options} />
        </div>
      </div>
    </Draggable>
  );
};

export default PieChart;
