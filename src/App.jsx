import { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./components/chart/LineChart";
import PieChart from "./components/chart/PieChart";
import ValueChart from "./components/chart/ValueChart";

function App() {
  // const from = 1646035200; // 2022-02-28 00:00:00 UTC
  // const to = 1646118000; // 2022-03-01 00:00:00 UTC

  const [from, setFrom] = useState(Math.floor(Date.now() / 1000) - 3600); // 1시간 전부터 데이터 가져오기
  const [to, setTo] = useState(Math.floor(Date.now() / 1000)); // 현재 시간까지 데이터 가져오기

  useEffect(() => {
    setInterval(() => {
      setFrom(Math.floor(Date.now() / 1000) - 3600);
      setTo(Math.floor(Date.now() / 1000));
    }, 10000);
  }, []);

  return (
    <div className="App">
      <LineChart from={from} to={to} />
      <PieChart from={from} to={to} />
      <ValueChart from={from} to={to} />
    </div>
  );
}

export default App;
