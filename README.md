# react-korea-map-visualization
한국 지도 데이터 시각화를 위한 리액트 라이브러리 🇰🇷📍🗺


## Description
기존에 React 프로젝트에서 지도 시각화 작업을 하기 위해서는, D3.js와 행정 경계 토지 topojson 데이터로 지도를 그리는 단계부터 시작해 A to Z 작업해야했고, 또 다른 프로젝트에 이를 사용할시 반복 작업을 해야하는 불편이 있었습니다.
위와 같은 반복 작업을 줄이고, 좀 더 효율적인 개발을 돕기 위해 D3.js를 바탕으로 React에서 사용할 수 있는 리액트 라이브러리를 제작해보았습니다.
Choropleth Map, Bubble Chart Map, Point Map, Pie Chart Map을 지원하며, Connection Map은 추후 업데이트 예정입니다.

## Goals


## Usage <a id="usage"></a>
라이브러리를 다운 받으시 후, 아래의 명령어를 입력해주세요. :)
 ```
 npm install
 ``` 
### storybook <a id="storybook"></a>
모든 UI 개발 과정은 Storybook를 적극적으로 활용하였습니다. UI를 확인하고 싶으시다면, storybook을 실행해주세요.
 ```
 npm run storybook
 // output: > start-storybook -p 6006
 ``` 
