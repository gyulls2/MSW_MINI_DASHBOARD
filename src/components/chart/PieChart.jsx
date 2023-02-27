import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
    labels: pieData && pieData?.data?.map((item) => item.name),
    datasets: [
      {
        label: pieData && pieData?.data?.value,
        data: pieData && pieData?.data?.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      fontSize: 25,
    },
  };

  return (
    <div>
      <Doughnut data={data} height={400} options={options} />
    </div>
  );
};

export default PieChart;
