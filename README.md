## 1. 실행 방법

1. 레포지토리 클론

```jsx
 $ git clone https://github.com/gyulls2/MSW_MINI_DASHBOARD.git
```

2. 패키지 다운로드

```jsx
 $ npm i
```

3. 실행

```jsx
 $ npm run start
```

## 2. 개요

- 주제 : MSW(Mock Service Worker)로 MINI_DASHBOARD 구현
- 주요 기능 :
  - MSW로 모킹한 데이터를 3종의 차트로 시각화합니다. 데이터는 10초마다 갱신됩니다.
  - 시간 범위 selector로 차트에 보여질 데이터 범위를 설정할 수 있습니다.
  - 버튼으로 차트를 대시보드에 추가하거나 제거할 수 있습니다.
  - 값 차트의 value가 500 이상일 때, 값의 색상이 변화합니다.
  - 마우스 드래그 앤 드롭으로 차트의 위치와 크기를 원하는 대로 조작할 수 있습니다.
- 기술 스택
  - React, Javascript, Chart.js, Styled-components, MUI

## 3. 작업 기록

**📍 02.26**

- 요구사항 확인 및 설계
- 개발 환경설정
- 커밋 컨벤션, 깃허브 이슈 템플릿 추가

**📍 02.27**

- MSW(Mock Service Worker) 라이브러리 설치
- 서비스 워커 생성 : `setupWorker()`
  💥 `handler.js` 파일 작동 시 다음과 같은 오류 발생

  > Uncaught Invariant Violation: [MSW] Failed to construct "SetupWorkerApi" given an Array of request handlers. `Make sure you spread the request handlers` when calling the respective setup function.

  - `SetupWorkerApi` 생성자가 Array 형태의 request handlers를 받을 때, 스프레드 연산자를 사용하지 않으면 오류가 발생할 수 있음.

  ```jsx
  export const handlers = [chartHandlers];

  // 스프레드 연산자를 사용하여 수정
  export const handlers = [...chartHandlers];
  ```

- MSW 서버 구동 테스트 : `fetch()`
  - 데이터 콘솔에 출력 확인<br/>
    [💥 라인 차트 → 시간 범위에 따라 데이터 개수가 너무 적게 출력되는 이슈 발생](#error1)
    > 시간 범위가 하루일 때 : 데이터 9개 출력, 시간 범위가 한 시간일 때 : 데이터 1개 출력
    > ⇒ 시간 범위에 따라 데이터 개수가 부족할 때, 차트가 그려지지 않는 문제가 발생하기 때문에 데이터 수를 늘려서 해결하였다.
  - `resolver` 폴더 파일들의 `interval` 변수 값 수정

**📍 02.28**

- line, pie, value 차트 구현 : `Chart.js`<br/>
  [💥 비동기처리 이슈](#error2)

  > Cannot read property 'map' of undefined.

  ```jsx
  labels: pieData.data.map((item) => item.name);

  // pieData.data에 데이터가 존재해야 map함수를 실행하도록 수정
  labels: pieData && pieData?.data?.map((item) => item.name);
  ```

- 10초마다 차트 데이터 갱신 기능 : `useInterval`(custom hook)<br/>
  [💥 setInterval 이슈](#error3)
  > setInterval이 일정 시간마다 작업을 수행하려 렌더링 될 때마다 useState의 값이 초기값으로 다시 세팅되는 이슈가 발생했다(setInterval 실행시 내부에 클로저가 발생). 이를 해결하기 위해 업데이트 된 state를 반영할 수 있는 커스텀 훅 `useInterval`을 사용하여 해결하였다.
- 시간 범위 selector 기능 : `MUI 라이브러리`(UI)

**📍 03.01**

- 차트 컴포넌트 크기 조작 기능(마우스 Drag) : CSS `resize: both;` 속성 추가
- 차트 컴포넌트 위치 조작 기능(마우스 Drag) : `react-draggable 라이브러리`
- 차트를 대시보드에 추가 / 제거 버튼 구현
- 컴포넌트 스타일링 : `styled-components`
- readme 작성

## 4. 트러블 슈팅

### <span id="error1">📍 시간 범위에 따라 데이터 개수가 너무 적게 출력되는 이슈</span>

- GET /timeseries API 의 응답 데이터를 출력한 결과 시간 범위가 하루일 때 데이터 9개 출력되었고, 시간 범위가 한 시간일 때는 데이터가 1개 밖에 출력되지 않아 차트가 그려지지 않는 이슈가 발생했다.
- `resolver` 폴더 `timeseries.js`파일의 `interval` 변수 값을 수정했다.
- `interval` 변수는 10\*1000의 값으로 설정되어 있다. 10초를 밀리초로 변환한 값이며, 데이터가 10초 간격으로 기록되었음을 의미한다.
- `interval` 의 값을 0.1\*1000로 수정하였다. 1시간, 30분, 10분 간격으로 시간 범위를 설정하여도 데이터가 여러 개가 출력될 수 있도록 기록 시간을 0.1초로 바꿔주었다.

### <span id="error2">📍 React 실행오류 Cannot read property 'map' of undefined(비동기처리)</span>

- 응답 데이터를 받아 chart의 라벨로 뿌려주는 코드를 작성했다. map 함수를 사용해 원하는 데이터를 추출하고자 했는데 다음과 같은 실행오류 발생.

> Cannot read property 'map' of undefined.

- fetch 요청은 비동기적으로 동작한다. map이 실행될 당시에 데이터가 아직 저장되지 않은 상태여서 오류가 발생함.
- pieData.data에 데이터가 존재해야 map함수를 실행하도록 `?` 연산자를 붙여주었다.

```jsx
labels: pieData.data.map((item) => item.name);

// pieData.data에 데이터가 존재해야 map함수를 실행하도록 수정
labels: pieData.data?.map((item) => item.name);
```

### <span id="error3">📍 setInterval 이슈</span>

- 10초마다 차트 데이터를 갱신하는 기능을 구현하기 위해 setInterval 함수를 사용하여 코드를 작성했다.
- 문제는 시간 범위 selector의 값을 저장하기 위해 useState를 사용하였고, setInterval이 일정 시간마다 작업을 수행하려 렌더링 될 때마다 useState의 값이 초기값으로 다시 세팅되는 이슈가 발생했다. 이 문제 때문에 시간 범위 selector를 30분으로 조정하여도 10초 후 다시 초기값인 1시간 범위로 돌아가는 문제가 생겼다.
- 의존성 배열로 빈 배열을 가진 useEffect는 처음 mount 시점에 한 번 실행된다. 따라서 useEffect는 첫 렌더의 state를 이용해서 setInterval을 실행하는데, 이후로는 해당 useEffect가 다시 실행되지 않기 때문에 setInterval의 클로져는 계속해서 첫 렌더의 state를 기억하고 있다. 그 후에 state가 변경되어도 interval에서 state는 계속해서 첫 렌더의 state값으로 초기화된다.
- 업데이트 된 state를 반영할 수 있는 커스텀 훅 `useInterval`

```jsx
import React, { useState, useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
    if (delay !== null) {
      let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
};

export default useInterval;
```

👉  `useRef`, `callback 함수를 저장하는 useEffect`, `setInterval을 호출하는 useEffect` 로 구성되어 있다.

- `useRef`훅을 사용하여 리렌더링을 방지
- callback 데이터가 바뀔 때마다 `useEffect`가 실행되어 `savedCallback`의 current 값이 새로운 callback 데이터로 업데이트 된다.
- 이를 통해 최근 렌더링 이후에 설정한 callback을 읽을 수 있고, interval tick에서 호출할 수 있기 때문에 업데이트된 state를 반영할 수 있다.

👉  다음과 같이 수정하였다.

```jsx
const [sec, setSec] = useState(0);

useEffect(() => {
  setInterval(() => {
    const setTime = sec ? sec : 3600;
    setFrom(Math.floor(Date.now() / 1000) - setTime);
    setTo(Math.floor(Date.now() / 1000));
  }, 10000);
}, []);

// useEffect를 사용하지 않고, setInterval 함수를 useInterval로 교체
useInterval(() => {
  const setTime = sec ? sec : 3600;
  setFrom(Math.floor(Date.now() / 1000) - setTime);
  setTo(Math.floor(Date.now() / 1000));
}, 10000);
```

## 4. 컴포넌트 구조

```
📦 MSW_MINI_DASHBOARD
📂src
 ┣ 📂components
 ┃ ┣ 📂chart
 ┃ ┃ ┣ 📜LineChart.jsx
 ┃ ┃ ┣ 📜PieChart.jsx
 ┃ ┃ ┗ 📜ValueChart.jsx
 ┃ ┣ 📂chartSelector
 ┃ ┃ ┗ 📜ChartSelector.jsx
 ┃ ┗ 📂timeSelector
 ┃ ┃ ┣ 📜CurrentTime.jsx
 ┃ ┃ ┗ 📜TimeSelector.jsx
 ┣ 📂hooks
 ┃ ┗ 📜useInterval.js
 ┣ 📂mocks
 ┃ ┣ 📂resolver
 ┃ ┃ ┣ 📜pie.js
 ┃ ┃ ┣ 📜timeseries.data.js
 ┃ ┃ ┣ 📜timeseries.js
 ┃ ┃ ┗ 📜value.js
 ┃ ┣ 📜browser.js
 ┃ ┗ 📜handler.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.css
 ┗ 📜index.js
```

## 5. 커밋 컨벤션

| Feat     | 새로운 기능을 추가할 경우                                                 |
| -------- | ------------------------------------------------------------------------- |
| Fix      | 버그를 고친 경우                                                          |
| Style    | CSS 등 사용자 UI 디자인 변경                                              |
| Refactor | 프로덕션 코드 리팩토링                                                    |
| Comment  | 필요한 주석 추가 및 변경                                                  |
| Docs     | 문서를 수정한 경우                                                        |
| Test     | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| Chore    | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| Rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| Remove   | 파일을 삭제하는 작업만 수행한 경우                                        |

## 6. 참고 문서

- **msw 모킹**

[Mocking REST API - Getting Started](https://mswjs.io/docs/getting-started/mocks/rest-api)

[MSW로 모킹하기](https://leo-xee.github.io/React/react-msw/)

[MSW로 백앤드 API 모킹하기](https://www.daleseo.com/mock-service-worker/)

- **Fetch 함수**

[Using the Fetch API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

- **chart.js**

[Integrate Chart.js Using React with Data from a REST API (2022)](https://www.youtube.com/watch?v=yOousFGfmZc)

- **React 실행오류 Cannot read property 'map' of undefined(비동기처리)**

[React 실행오류 Cannot read property 'map' of undefined](https://devbirdfeet.tistory.com/47)

[[오류해결] TypeError: Cannot read property 'map' of undefined](https://velog.io/@dum6894/오류해결-TypeError-Cannot-read-property-map-of-undefined)

- **setInterval**

[Hook 자주 묻는 질문 – React](https://ko.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)

[Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

[번역 / 리액트 훅스 컴포넌트에서 setInterval 사용 시의 문제점](https://velog.io/@jakeseo_me/번역-리액트-훅스-컴포넌트에서-setInterval-사용-시의-문제점#왜-useinterval이-더-나은-api일까요)

[React에서 setInterval 현명하게 사용하기(feat. useInterval)](https://mingule.tistory.com/65)
