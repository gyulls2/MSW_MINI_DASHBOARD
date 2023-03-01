import React from "react";
import { useState } from "react";
import styled from "styled-components";

const CurrentTime = () => {
  const [day, setDay] = useState("0000-00-00");
  const [time, setTime] = useState("00:00:00");

  function Timer() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const days = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    const sec = ("0" + date.getSeconds()).slice(-2);
    setDay(`${year}-${month}-${days}`);
    setTime(`${hour}:${min}:${sec}`);
  }

  setInterval(Timer, 1000);

  return (
    <div>
      <Day>{day}</Day>
      <br />
      <Time>{time}</Time>
    </div>
  );
};

export default CurrentTime;

const Time = styled.div`
  font-size: 2.5rem;
  margin-bottom: 40px;
`;

const Day = styled.div`
  font-size: 1.2rem;
  margin-bottom: -10px;
`;
