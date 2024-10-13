import NavBarCpn from "../Component/navBarCpn";
// import Member from "../Component/member";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from "react-router-dom";
function TrangChuScreen(props) {
  const config = {
    ...props.config,
    location: useLocation().pathname,
    headerHeight: window.innerWidth < 1000 ? 100 : 180,
    backgroundImg: require("../Public/Assets/DUOYIN.png"),
    imgMaxHeight: window.innerWidth < 1000 ? "350px" : "auto",
    titleSize: "90px",
  };
  return (
    <div className="bg-white">
      <NavBarCpn config={config} />
      <div></div>
      {/* <div className="c-lightRed text-center fw-bold mb-5" style={{ fontSize: config.titleSize }}>
        DUOYIN
      </div> */}
      <div>
        {/* <div className="c-darkBlue text-center fw-bold" style={{ fontSize: "40px" }}>
          {" "}
          Hệ thống ngữ liệu chữ Hán đa âm trực tuyến{" "}
        </div>
        <div className="c-darkBlue text-center fw-bold mb-5" style={{ fontSize: "40px" }}>
          {" "}
          多音字语料库在线系统{" "}
        </div> */}
        <img
          src={config.backgroundImg}
          className="object-fit-cover"
          style={{ width: "100%", height: config.imgMaxHeight }}
          alt="Logo"
        />
      </div>

      {/* <Member /> */}
    </div>
  );
}

export default TrangChuScreen;
