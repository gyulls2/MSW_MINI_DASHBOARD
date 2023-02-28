import { useState } from "react";
import "./App.css";
import LineChart from "./components/chart/LineChart";
import PieChart from "./components/chart/PieChart";
import ValueChart from "./components/chart/ValueChart";
import TimeSelector from "./components/timeSelector/TimeSelector";
import useInterval from "./hooks/useInterval";

function App() {
  // const from = 1646035200; // 2022-02-28 00:00:00 UTC
  // const to = 1646118000; // 2022-03-01 00:00:00 UTC

  const [sec, setSec] = useState(0);
  const [from, setFrom] = useState(() => startTime()); // 1시간 전부터 데이터 가져오기
  const [to, setTo] = useState(() => currentTime()); // 현재 시간까지 데이터 가져오기

  function startTime() {
    const setTime = sec ? sec : 3600;
    return Math.floor(Date.now() / 1000) - setTime;
  }

  function currentTime() {
    return Math.floor(Date.now() / 1000);
  }

  useInterval(() => {
    const setTime = sec ? sec : 3600;
    setFrom(Math.floor(Date.now() / 1000) - setTime);
    setTo(Math.floor(Date.now() / 1000));
  }, 10000);

  function timeSelectorHandler(time) {
    setSec(time);
    setFrom(Math.floor(Date.now() / 1000) - time);
    setTo(Math.floor(Date.now() / 1000));
  }

  return (
    <div className="App">
      <TimeSelector timeSelectorHandler={timeSelectorHandler} />
      <LineChart from={from} to={to} />
      <PieChart from={from} to={to} />
      <ValueChart from={from} to={to} />
    </div>
  );
}

export default App;
