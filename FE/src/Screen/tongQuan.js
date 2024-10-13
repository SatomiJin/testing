import NavBarCpn from "../Component/navBarCpn";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
function TongQuanScreen(props) {
  const screenWidth = window.innerWidth;
  const config = {
    ...props.config,
    location: useLocation().pathname,
    headerHeight: screenWidth < 1000 ? 160 : 120,
    duoyinFontSize: screenWidth < 1000 ? "30px" : "80px",
    duoyinFontWeight: screenWidth < 1000 ? 700 : 700,
    soTayPng: require("../Public/Assets/soTay.png"),
    baiTapPng: require("../Public/Assets/baiTap.png"),
    videoPng: require("../Public/Assets/video.png"),
    hotroPng: require("../Public/Assets/chat.png"),
    dienDanPng: require("../Public/Assets/micro.png"),
    imgHeight: screenWidth < 1000 ? "130px" : "300px",
  };
  return (
    <div className="bg-lightRed container-fluid px-0 text-white">
      <NavBarCpn config={config} />
      <div style={{ height: config.headerHeight }}></div>
      <div
        className="text-center m-0 p-0"
        style={{
          fontSize: config.duoyinFontSize,
          fontWeight: config.duoyinFontWeight,
        }}>
        DUOYIN
      </div>
      <div className="row justify-content-center px-4 m-0 p-0">
        <div className="col-lg-8 mb-3 col-12 self-align-center fs-3">
          <div style={{ textAlign: "justify" }}>
            DUOYIN là hệ thống ngữ liệu trực tuyến tích hợp sổ tay từ vựng và
            bài tập vận dụng chữ Hán đa âm. Hệ thống cung cấp các tính năng hỗ
            trợ người học dễ dàng tra cứu và ôn luyện kiến thức về chữ Hán đa
            âm.
          </div>
        </div>
      </div>

      <div className="fs-1 fw-bold mb-5 text-center mt-5 pt-5">
        Các tính năng nổi bật
      </div>
      <div className="row mx-0 justify-content-center">
        <div className="col-lg-10 col-12 self-align-center">
          <div className="pb-5">
            <div className="row justify-content-start px-0 mx-0">
              <div
                style={{ textAlign: "justify" }}
                className="col-lg-10 mb-5 col-12">
                <img
                  src={config.soTayPng}
                  style={{ height: config.imgHeight }}
                />
                <div className="fw-bold fs-2">Sổ tay (笔记本)</div>
                <div className="fs-4">
                  Bao gồm chức năng tra cứu theo chữ Hán, hiển thị một danh sách
                  đa dạng các chữ Hán đa âm, cung cấp tương đối đầy đủ các kiến
                  thức về từng chữ đa âm. Điểm nổi bật của sổ tay mà hệ thống
                  cung cấp chính là phần ví dụ được lồng ghép một lượng kiến
                  thức nhất định về đất nước Trung Quốc và các kiến thức khác
                  như kiến thức về khoa học, kinh tế, xã hội, văn hóa, đời sống
                  thường ngày... Sổ tay chữ Hán đa âm của DUOYIN hệ thống hóa
                  các chữ Hán đa âm, vừa hỗ trợ người học học chữ đa âm dễ dàng
                  và nhanh chóng hơn vừa giúp người học có thêm nhiều kiến thức
                  bổ ích.
                </div>
              </div>
            </div>
            <div className="row justify-content-end px-0 mx-0">
              <div
                style={{ textAlign: "justify" }}
                className="col-lg-10 mb-5 col-12 text-right">
                <img
                  src={config.baiTapPng}
                  style={{ height: config.imgHeight }}
                />
                <div className="fw-bold fs-2">Luyện tập (练习)</div>
                <div className="fs-4">
                  Gồm 4 dạng bài tập, người học thực hiện click vào biểu tượng
                  thể hiện dạng bài tập tương ứng để tiến hành làm bài, nộp bài
                  và kiểm tra đáp án đúng. Tính năng luyện tập giúp người học
                  rèn luyện khả năng ghi nhớ và vận dụng các kiến thức về chữ
                  Hán đa âm một cách nhanh chóng và hiệu quả.
                </div>
              </div>
            </div>
            <div className="row justify-content-start px-0 mx-0">
              <div
                style={{ textAlign: "justify" }}
                className="col-lg-10 mb-5 col-12 text-left">
                <img
                  src={config.videoPng}
                  style={{ height: config.imgHeight }}
                />
                <div className="fw-bold fs-2">Video (视频)</div>
                <div className="fs-4">
                  Bao gồm các video ngắn, giúp người học học ngay các chữ Hán đa
                  âm chỉ với một câu nói. Tính năng này giúp người học hiểu rõ
                  hơn về trường hợp sử dụng các âm đọc của chữ Hán đa âm, phân
                  biệt rõ hơn các âm đọc của chữ và giúp gia tăng trí nhớ của
                  người học khi học chữ Hán đa âm.
                </div>
              </div>
            </div>
            <div className="row justify-content-end px-0 mx-0">
              <div
                style={{ textAlign: "justify" }}
                className="col-lg-10 mb-5 col-12 text-right">
                    <img
                  src={config.dienDanPng}
                  style={{ height: config.imgHeight }}
                />
                <div className="fw-bold fs-2">Diễn đàn (论坛):</div>
                <div className="fs-4">
                  Nơi người học có thể theo dõi và cập nhật, trao đổi và chia sẻ
                  các thông tin, vấn đề liên quan đến website DUOYIN nói riêng
                  và chữ Hán đa âm nói chung.
                </div>
              </div>
            </div>
            <div className="row justify-content-start px-0 mx-0">
              <div
                style={{ textAlign: "justify" }}
                className="col-lg-10 mb-5 col-12 text-left">
                    <img
                  src={config.hotroPng}
                  style={{ height: config.imgHeight }}
                />
                <div className="fw-bold fs-2">Trợ giúp (帮助)</div>
                <div className="fs-4">
                  Thông qua thông tin liên hệ, người học có thể liên hệ với nhóm
                  nghiên cứu bất cứ lúc nào, chúng mình sẽ hỗ trợ giải đáp các
                  vấn đề liên quan đến hệ thống ngữ liệu trực tuyến DUOYIN.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TongQuanScreen;
