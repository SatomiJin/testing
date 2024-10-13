import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Link, useNavigate } from "react-router-dom";
import { ReactComponent as TrangChu } from "../Public/Assets/trangChu.svg";
import { ReactComponent as TongQuan } from "../Public/Assets/tongQuan.svg";
import { ReactComponent as SoTay } from "../Public/Assets/soTay.svg";
import { ReactComponent as BaiTap } from "../Public/Assets/baiTap.svg";
import { ReactComponent as Video } from "../Public/Assets/video.svg";
import { ReactComponent as DienDan } from "../Public/Assets/dienDan.svg";
import { ReactComponent as HoTro } from "../Public/Assets/hoTro.svg";
import "./ComponentCss/navBarCpn.css";

const logo = require("../Public/Assets/logo.png");

const NavBarCpn = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  const config = {
    ...props.config,
    baseFooterFontSize: window.innerWidth < 1000 ? "14px" : "20px",
    titleFooterFontSize: window.innerWidth < 1000 ? "17px" : "25px",
    logoSize: window.innerWidth < 1000 ? "100px" : "70px",
    navElementWidth: window.innerWidth < 1000 ? "100px" : "200px",
  };
  const navList = [
    { name: "主页", path: "trangChu", icon: <TrangChu />, mobileIcon: <i className="fa-solid fa-house-user"></i> },
    { name: "概述", path: "tongQuan", icon: <TongQuan />, mobileIcon: <i className="fa-solid fa-id-card-clip"></i> },
    { name: "笔记本", path: "soTay", icon: <SoTay />, mobileIcon: <i className="fa-solid fa-book"></i> },
    { name: "练习", path: "baiTap", icon: <BaiTap />, mobileIcon: <i className="fa-solid fa-pen"></i> },
    { name: "视频", path: "video", icon: <Video />, mobileIcon: <i className="fa-brands fa-youtube"></i> },
    // { name: "论坛", path: "dienDan" },
    // { name: "帮助", path: "hoTro", icon: <HoTro /> },
  ];
  const handleClick = (path, location) => {
    window.scrollTo(0, 0);
    setIsOpen(!isOpen);
    navigate(location.split("/").slice(0, 1).join("/") + "/" + path);
  };
  const location = config.location;
  const page = location.split("/")[1];
  useEffect(() => {
    let nav = document.querySelector(".header-component");
    const navPlaceholder = document.querySelector(".nav-placeholder");

    let topOfNav = nav.offsetTop;
    console.log(topOfNav);

    const fixedNav = () => {
      if (window.scrollY > 300) {
        nav.classList.add("fixed-nav");
        navPlaceholder.style.height = `${nav.offsetHeight}px`; // giữ chỗ khi nav cố định

        // nav.classList.add("fixed-nav");
      } else {
        nav.classList.remove("fixed-nav");
        // nav.classList.remove("fixed-nav");
        navPlaceholder.style.height = `0px`; // giữ chỗ khi nav cố định
      }
    };
    window.addEventListener("scroll", fixedNav);

    return () => {
      window.removeEventListener("scroll", fixedNav);
    };
  }, []);

  return (
    <>
      <div className="header-component p-3 container-fluid z-3">
        <div className="header-component_mobile">
          <div className="mobile_wrapper">
            <div className="text-white fs-1 logo col-lg-3 col-2 align-self-center fw-bold valign">
              <img src={logo} className="header_logo img-fluid" style={{ maxHeight: config.logoSize }} alt="Logo" />
            </div>
            <div className="dropdown">
              <div className="dropdown_text" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i
                  onClick={() => setIsOpen(!isOpen)}
                  className={`fa-solid ${isOpen && isOpen === true ? "fa-bars-staggered" : "fa-bars"}`}
                ></i>
              </div>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {navList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleClick(item.path, location);
                    }}
                    className="dropdown-item"
                  >
                    {item.mobileIcon}
                    {item.name}
                  </li>
                ))}
                <li
                  className="dropdown-item"
                  onClick={() =>
                    (window.location.href = "https://www.facebook.com/profile.php?id=61557907629340&mibextid=ZbWKwL")
                  }
                >
                  <i className="fa-solid fa-users"></i> 论坛
                </li>
                <li
                  className="dropdown-item"
                  onClick={() =>
                    (window.location.href =
                      "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=duoyinzi99@gmail.com")
                  }
                >
                  <i className="fa-regular fa-comments"></i>
                  帮助
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-component_pc header-component_container row justify-content-between">
          <div className="text-white fs-1 logo col-lg-3 col-2 align-self-center fw-bold valign">
            <img src={logo} className="header_logo img-fluid" style={{ maxHeight: config.logoSize }} alt="Logo" />
          </div>
          <div className="col-lg-7 col-10 justify-content-center">
            <div className="row pt-3 justify-content-center">
              {navList.map((item, index) => (
                <div
                  key={index}
                  className={
                    "navbar_item text-white col-lg col-md-3 col-sm-3 px-2 lh-20 align hover-mouse hover-bold hover-bigger" +
                    (page === item.path ? "bigger active" : "")
                  }
                  style={{ maxWidth: config.navElementWidth }}
                >
                  <div
                    onClick={() => {
                      handleClick(item.path, location);
                    }}
                    className="d-flex flex-row "
                  >
                    {item.icon}
                    <div className="text-white text-decoration-none">{item.name}</div>
                  </div>
                </div>
              ))}

              <div
                className={
                  "navbar_item text-white col-lg col-md-3 col-sm-3 px-2  lh-20 valign hover-mouse hover-bold hover-bigger"
                }
                style={{ maxWidth: "120px" }}
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61557907629340&mibextid=ZbWKwL"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex flex-row ">
                    <DienDan />
                    <div className="text-white text-decoration-none">{"论坛"}</div>
                  </div>
                </a>
              </div>

              <div
                className={
                  "navbar_item text-white col-lg col-md-3 col-sm-3 px-2  lh-20 valign hover-mouse hover-bold hover-bigger"
                }
                style={{ maxWidth: "120px" }}
              >
                <a
                  href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=duoyinzi99@gmail.com"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="navbar_item d-flex flex-row">
                    <HoTro />
                    <div className="text-white text-decoration-none">{"帮助"}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-placeholder"></div>
    </>
  );
};
export default NavBarCpn;
