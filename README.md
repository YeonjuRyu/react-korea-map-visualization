# react-korea-map-visualization
한국 지도 데이터 시각화를 위한 리액트 라이브러리 🇰🇷📍🗺

## ScreenShots
<div>
<img width="30%" height="300" src="https://user-images.githubusercontent.com/44253680/102086887-1d096380-3e5c-11eb-8b0c-fdc72f28fee1.png">
<img width="30%"" height="300" src="https://user-images.githubusercontent.com/44253680/102086763-f0ede280-3e5b-11eb-94fb-d209435c2544.png">
<img width="30%" height="300" src="https://user-images.githubusercontent.com/44253680/102087082-5fcb3b80-3e5c-11eb-8898-29b2b9ba28c3.png">
</div>


## Description
기존에 React 프로젝트에서 지도 시각화 작업을 하기 위해서는, D3.js와 행정 경계 토지 topojson 데이터로 지도를 그리는 단계부터 시작해 A to Z 작업해야했고, 또 다른 프로젝트에 이를 사용할시 반복 작업을 해야하는 불편이 있었습니다.
위와 같은 반복 작업을 줄이고, 좀 더 효율적인 개발을 돕기 위해 D3.js를 바탕으로 React에서 사용할 수 있는 리액트 라이브러리를 제작해보았습니다.
Choropleth Map, Bubble Chart Map, Point Map, Pie Chart Map을 지원하며, Connection Map은 추후 업데이트 예정입니다.

## Goals



## Usage <a id="usage"></a>
라이브러리를 다운 받으시 후, 아래의 명령어를 입력해주세요. :)
### install <a id="install"></a>
 ```
 npm install
 ``` 
### Choropleth Map <a id="choroplethMap"></a>
![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/44253680/102717541-60654580-4326-11eb-8a2f-4022349ce509.gif)
#### Props
Prop                  | Type                           | Optional           | Default                   | Description
--------------------- | ------------------------------ | ------------------ | ------------------------- | -----------
data                  | Array\<ChoroplethMapDataType\> |                    | -                         | 각 지역별 코드와 데이터를 가진 \<ChoroplethMapDataType\> 타입 데이터의 배열
colors                | Array\<ColorDataType\>         |                    | -                         | 각 데이터 별 나타낼 \<ColorDataType\> 타입 데이터의 배열
defaultColor          | string                         | :heavy_check_mark: | -                         | 지도 위 행정구역의 기본 색상
borderColor           | string                         | :heavy_check_mark: | -                         | 지도의 경계선 색상
styledOnHover         | object                         | :heavy_check_mark: | -                         | 마우스가 지도 내 지역에 올라간 상태일 때, 적용할 스타일
onRegionHover         | function                       | :heavy_check_mark: | -                         | 마우스가 지도 내 지역에 올라간 상태일 때, 해당 지역 정보를 받는 콜백 함수

##### ChoroplethMapDataType
Prop                  | Type     | Optional           | Default                   | Description
--------------------- | -------- | ------------------ | ------------------------- | -----------
regionCode            | string   |                    |                           | 시/도, 시/군/구의 경우 행정지역코드, 읍/면/동의 경우 법정지역코드
level                 | number   | :heavy_check_mark: | -                         | 해당 지역의 choropleth 레벨, ColorDataType의 level과 함께 사용해야함
value                 | number   | :heavy_check_mark: | -                         | 해당 지역의 데이터 값, ColorDataType의 range와 함께 사용해야함

##### ColorDataType
Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
level                 | number                      | :heavy_check_mark: | -                         | ChoroplethMapDataType의 level과 함께 사용
range                 | {start: number, end:number} | :heavy_check_mark: | -                         | ChoroplethMapDataType의 value와 함께 사용
color                 | string                      |                    | -                         | 해당하는 level에 맞거나, range 내에 속한 데이터를 나타낼 색상



### Pie Chart Map <a id="pieChartMap"></a>
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/44253680/102717581-9dc9d300-4326-11eb-89bb-d2948a6cd938.gif)
#### Props
Prop                  | Type                           | Optional           | Default                   | Description
--------------------- | ------------------------------ | ------------------ | ------------------------- | -----------
valueType             | 'number' | 'percentage'        |                    | -                         | 파이 차트를 구성할 데이터 값의 타입 (값 or 비율)
data                  | Array\<PieChartMapDataType\>   |                    | -                         | PieChartMapDataType 데이터의 배열
colors                | Array\<PieChartColorType\>     |                    | -                         | PieChartColorType 데이터의 배열
pieChartStyle         | object                         | :heavy_check_mark: | -                         | pieChart의 스타일
r                     | number                         | :heavy_check_mark: | -                         | pieChart의 반지름, pieChart 크기를 결정
innerRadius           | number                         | :heavy_check_mark: | 1                         | pieChart 중심점으로부터 내부 원의 크기 결정, 1 이상일 시 차트가 도넛 모형이 됨
onMouseOver           | function                       | :heavy_check_mark: | -                         | 마우스가 pieChart에 올라간 상태일 때 호출되는 콜백 함수
onMouseOut            | function                       | :heavy_check_mark: | -                         | 마우스가 pieChart에서 내려온 상태일 때 호출되는 콜백 함수
isDataSummaryVisible  | boolean                        | :heavy_check_mark: | -                         | 기본 제공하는 pieChart 데이터 요약 박스으 노출 여부

##### PieChartMapDataType
정확한 위치 좌표(lon, lat) 혹은 지역 코드(regionCode) 둘 중 하나는 필수적으로 입력해야함.

Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
data                  | Array\<PieChartDataType\>   |                    | -                         | PieChartDataType 데이터의 배열
lon                   | number                      | :heavy_check_mark: |                           | 장소의 경도
lat                   | number                      | :heavy_check_mark: | -                         | 장소의 위도
regionCode            | number                      | :heavy_check_mark: | -                         | 장소의 지역 코드
regionName            | string                      | :heavy_check_mark: | -                         | 장소의 이름
r                     | number                      | :heavy_check_mark: | -                         | pieChart의 반지름, pieChart 크기를 결정
innerRadius           | number                      | :heavy_check_mark: | -                         | pieChart 중심점으로부터 내부 원의 크기 결정, 1 이상일 시 차트가 도넛 모형이 됨

##### PieChartDataType
Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
label                 | string                      |                    | -                         | 데이터 레이블
value                 | number                      |                    | -                         | 데이터 값

##### PieChartColorType
Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
label                 | string                      |                    | -                         | pieChartDataType의 label과 맞추어 사용
color                 | string                      |                    | -                         | 해당하는 label에 매칭되는 데이터를 나타낼 색상

### Point Map <a id="pointMap"></a>
해당 장소에 대한 좌표 데이터를 받아 스타일 대로 나타내게 됩니다. html 스타일 속성을 전달할 수 있고, image 등을 전달할 수도 있습니다.
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/44253680/102717598-b934de00-4326-11eb-8f71-04e6598b9950.gif)
#### Props
Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
data                  | Array\<PointMapDataType\>   |                    |                           | PointMapDataType 데이터
pointComponent        | React Node.                 | :heavy_check_mark: | -                         | 포인트 컴포넌트, 이미지 전달 가능
pointStyle            | object                      | :heavy_check_mark: | -                         | 포인트 스타일
onPointHovered        | function                    | :heavy_check_mark: | -                         | 마우스 이벤트 발생시 호출하는 콜백 함수, 해당 포인트의 PointMapDataType 데이터 반환

##### PointMapDataType
Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
lon                   | number                      |                    |                           | 장소의 경도
lat                   | number                      |                    |                           | 장소의 위도
name                  | string                      | :heavy_check_mark: | null                      | 장소명
description           | string                      | :heavy_check_mark: | null                      | 장소 설명



### Bubble Map <a id="bubblehMap"></a>
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/44253680/102717604-c5b93680-4326-11eb-9223-e28148a249b1.gif)
#### Props
Prop                  | Type                        | Optional            | Default                   | Description
--------------------- | --------------------------- | ------------------- | ------------------------- | -----------
data                  | Array\<BubbleMapDataType\>   |                    |                           | BubbleMapDataType 데이터
bubbleComponent        | React Node                  | :heavy_check_mark: |                           | 버블 컴포넌트, 이미지 전달 가능
bubbleStyle            | object                      | :heavy_check_mark: |                           | 버블 스타일
onBubbleHovered        | function                    | :heavy_check_mark: |                           | 마우스 이벤트 발생시 호출하는 콜백 함수, 해당 버블의 BubbleMapDataType 데이터 반환

##### BubbleMapDataType
정확한 위치 좌표(lon, lat) 혹은 지역 코드(regionCode) 둘 중 하나는 필수적으로 입력해야함.

Prop                  | Type                        | Optional           | Default                   | Description
--------------------- | --------------------------- | ------------------ | ------------------------- | -----------
lon                   | number                      | :heavy_check_mark: |                           | 버블을 나타낼 장소의 경도
lat                   | number                      | :heavy_check_mark: |                           | 버블을 나타낼 장소의 위도
regionCode            | number                      | :heavy_check_mark: |                           | 버블을 나타낼 지역의 지역코드
name                  | string                      | :heavy_check_mark: |                           | 장소명
value                 | number                      | :heavy_check_mark: |                           | 데이터 값
component             | React Node                  | :heavy_check_mark: |                           | 버블 컴포넌트, 하나의 버블에만 적용됨


### storybook <a id="storybook"></a>
모든 개발 과정에서 Storybook를 적극적으로 활용하였습니다. UI를 확인하고 싶으시다면, storybook을 실행해주세요.
 ```
 npm run storybook
 // output: > start-storybook -p 6006
 ``` 
