import { useRef, useState } from "react";
import "./App.css";
import LineChart from "./components/chart/LineChart";
import PieChart from "./components/chart/PieChart";
import ValueChart from "./components/chart/ValueChart";
import ChartSelector from "./components/chartSelector/ChartSelector";
import TimeSelector from "./components/timeSelector/TimeSelector";
import useInterval from "./hooks/useInterval";
import styled from "styled-components";

function App() {
  // const from = 1646035200; // 2022-02-28 00:00:00 UTC
  // const to = 1646118000; // 2022-03-01 00:00:00 UTC

  const [sec, setSec] = useState(0);
  const [from, setFrom] = useState(() => startTime()); // 1시간 전부터 데이터 가져오기
  const [to, setTo] = useState(() => currentTime()); // 현재 시간까지 데이터 가져오기
  const lineRef = useRef();
  const pieRef = useRef();
  const valueRef = useRef();

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

  function chartSelectorHandler(isVisible, title) {
    console.log(title);
    if (title === "LineChart") {
      if (isVisible) lineRef.current.style = "display:none";
      else lineRef.current.style = "display:block";
    } else if (title === "PieChart") {
      if (isVisible) pieRef.current.style = "display:none";
      else pieRef.current.style = "display:block";
    } else {
      if (isVisible) valueRef.current.style = "display:none";
      else valueRef.current.style = "display:block";
    }
  }

  return (
    <div className="App">
      <section className="controllerSection">
        <TimeSelector timeSelectorHandler={timeSelectorHandler} />
        <ChartSelector
          title="LineChart"
          chartSelectorHandler={chartSelectorHandler}
        />
        <ChartSelector
          title="PieChart"
          chartSelectorHandler={chartSelectorHandler}
        />
        <ChartSelector
          title="ValueChart"
          chartSelectorHandler={chartSelectorHandler}
        />
      </section>

      <section className="dashboardSection">
        <StyledDIV ref={lineRef}>
          <LineChart from={from} to={to} />
        </StyledDIV>

        <StyledPie ref={pieRef}>
          <PieChart from={from} to={to} />
        </StyledPie>

        <StyledValue ref={valueRef}>
          <ValueChart from={from} to={to} />
        </StyledValue>
      </section>
    </div>
  );
}

export default App;

const StyledDIV = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledPie = styled.div`
  width: 60%;
  margin-bottom: 20px;
`;

const StyledValue = styled.div`
  width: 38%;
  margin-bottom: 20px;
`;
