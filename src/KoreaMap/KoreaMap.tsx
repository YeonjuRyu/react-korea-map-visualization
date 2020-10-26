import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./KoreaMap.scss";

const SCALE = {
  provinces: {
    filename: "gdam-topo1.json",
    feature: "gdam-geo1"
  },
  municipalitie: {
    filename: "gdam-topo2.json",
    feature: "gdam-geo2"
  },
  submunicipalities: {
    filename: "2020topo.json",
    feature: "2020geo"
  }
};

const KoreaMap = ({ scale = "provinces" }) => {
  const [geoData, setGeoData] = useState();
  useEffect(() => {
    let data = require(`../../public/${SCALE[scale].filename}`);
    setGeoData(topojson.feature(data, data.objects[`${SCALE[scale].feature}`]));
  }, []);
  //projection with geoMercator
  let projection = d3
    .geoMercator()
    .center([126.9895, 37.5651])
    .scale(3500)
    .translate([400 / 2, 250 / 2]);
  // 패스 작성
  var path = d3.geoPath().projection(projection);

  //zoom in/out 기능 추가
  let svg = d3.select(".regionGroup");
  d3.select(".regionGroup").call(
    d3.zoom().on("zoom", () => {
      svg.attr("transform", d3.zoomTransform(svg.node()));
    })
  );

  return (
    <div data-testid="test-component">
      <h1 className="heading">{scale}</h1>
      <svg width={512} height={512} style={{ backgroundColor: "lightGrey" }}>
        <g className={"regionGroup"}>
          {geoData &&
            geoData.features.map((item, index) => (
              <path className={"region"} key={"path" + index} d={path(item)} />
            ))}
        </g>
      </svg>
    </div>
  );
};

export default KoreaMap;
