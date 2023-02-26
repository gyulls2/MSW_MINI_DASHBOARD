import "./App.css";
import LineChart from "./components/chart/LineChart";
import PieChart from "./components/chart/PieChart";
import ValueChart from "./components/chart/ValueChart";

function App() {
  // const from = 1646035200; // 2022-02-28 00:00:00 UTC
  // const to = 1646118000; // 2022-03-01 00:00:00 UTC

  const from = Math.floor(Date.now() / 1000) - 3600; // 1시간 전부터 데이터 가져오기z
  const to = Math.floor(Date.now() / 1000); // 현재 시간까지 데이터 가져오기

  fetch(`/timeseries?from=${from}&to=${to}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad request body.");
      }
      return response.json();
    })
    .then((data) => {
      // 서버로부터 받은 데이터 처리
      console.log(`Name: ${data.name}`);
      console.log(`Unit: ${data.unit}`);
      console.log(`Data: ${data.data}`); // 시계열 데이터 배열
      console.log(`Times: ${data.times}`); // Unix Time 배열
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  fetch(`/pie?from=${from}&to=${to}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad request body.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`Name: ${JSON.stringify(data.data)}`);
      console.log(`Unit: ${data.unit}`);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  fetch(`/value?from=${from}&to=${to}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad request body.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`Name: ${data.name}`);
      console.log(`Value: ${data.value}`);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  return (
    <div className="App">
      <header className="App-header"></header>
      <LineChart from={from} to={to} />
      <PieChart from={from} to={to} />
      <ValueChart from={from} to={to} />
    </div>
  );
}

export default App;
