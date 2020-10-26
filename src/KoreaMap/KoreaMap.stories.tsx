import React from "react";
import KoreaMap from "./KoreaMap";

export default {
  title: "대한민국 지도"
};

export const Provinces = () => <KoreaMap scale={"provinces"} />;

export const Municipalitie = () => <KoreaMap scale={"municipalitie"} />;

export const Submunicipalities = () => <KoreaMap scale={"submunicipalities"} />;

Provinces.storyName = "시/도";
Municipalitie.storyName = "시/군/구";
Submunicipalities.storyName = "읍/면/동";
