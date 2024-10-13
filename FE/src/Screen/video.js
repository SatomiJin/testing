import NavBarCpn from "../Component/navBarCpn";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
function VideoScreen(props) {
  const config = {
    ...props.config,
    location: useLocation().pathname,
    headerHeight: window.innerWidth < 1000 ? 120 : 120,
    titleSize: window.innerWidth < 1000 ? "50px" : "90px",
    subTitleSize: window.innerWidth < 1000 ? "17px" : "50px",
    subSubTitleSize: window.innerWidth < 1000 ? "13px" : "17px",
  };
  const video = [
    {
      wordId: 1,
      title: "HỌC NGAY CHỮ HÁN ĐA ÂM “给” CHỈ VỚI MỘT CÂU NÓI???",
      link: "https://www.youtube.com/watch?v=2jiPNhPqydg&ab_channel=VuihọcchữHánđaâmcùngDUOYIN",
    },

    {
      wordId: 1,
      title: "HỌC NGAY CHỮ HÁN ĐA ÂM “为” CHỈ VỚI MỘT CÂU NÓI???",
      link: "https://www.youtube.com/watch?v=67B9RPoItW8&ab_channel=VuihọcchữHánđaâmcùngDUOYIN",
    },
  ];
  return (
    <div className="bg-white">
      <NavBarCpn config={config} />
      <div style={{ height: config.headerHeight }}></div>
      <div className="text-center pb-5">
        <div
          className="c-lightRed text-center fw-bold"
          style={{ fontSize: config.titleSize }}>
          DUOYIN
        </div>
        <div
          className="c-darkBlue fw-bold text-center "
          style={{ fontSize: config.subTitleSize }}>
          VIDEO PHÂN BIỆT CÁC ÂM ĐỌC CỦA CHỮ
        </div>
        <div
          className="c-darkBlue text-center "
          style={{ fontSize: config.subSubTitleSize }}>
          Click vào các nội dung tương ứng bên dưới để xem video
        </div>
        <div className="row px-1 mt-5 justify-content-center mx-0">
          <div className="col-lg-11 col-12">
            <div className="row">
              {video.map((item, index) => (
                <div className="col-lg-6 col-12 px-3" key={index}>
                  <div
                    className=" bg-darkBlue 
                    p-4 my-3 text-white 
                    hover-mouse hover-bigger hover-bold lh-20
                    shadow rounded-pill"
                    style={{ height: config.imgHeight, fontSize: "18px" }}
                    onClick={() => {
                      window.open(item.link, "_blank");
                    }}>
                    {`${item.title}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoScreen;
