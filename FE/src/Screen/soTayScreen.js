import NavBarCpn from "../Component/navBarCpn";
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
function SoTayScreen(props) {
  const config = {
    ...props.config,
    location: useLocation().pathname,
    data: props.data,
    showWordHeight: window.innerWidth < 1000 ? 480 : 550,
    headerHeight: window.innerWidth < 1000 ? 90 : 100,
  };
  const Card = ({ children, className }) => {
    return (
      <div className="card mb-3 mx-0 rounded shadow-sm border-0">
        <div className={"card-body " + className}>
          <p className="card-text text-center">{children}</p>
        </div>
      </div>
    );
  };
  function getCookie(name) {
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split("=");
      if (name === cookiePair[0].trim()) {
        console.log(cookiePair[1]);
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  const [searchWord, setSearchWord] = useState("");
  var viewedWordList = JSON.parse(getCookie("viewedWordList"));
  if (!viewedWordList) viewedWordList = [];
  var freshDataList = config.data.filter(
    (num) => !viewedWordList.includes(num[config.idIndex])
  );

  freshDataList = freshDataList.sort((a, b) =>
    a[config.amDoc_1_Index].localeCompare(b[config.amDoc_1_Index])
  );

  var viewedDataList = [];
  viewedWordList.map((pushItem, index) => {
    var data = config.data.find((item) => item[config.idIndex] === pushItem);
    if (data) viewedDataList.push(data);
  });

  const handleSearch = (event) => {
    setSearchWord(event.target.value);
  };
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  console.log(window.innerWidth);
  return (
    <div className="bg-lightRed mh-100" >
      <NavBarCpn config={config} />
      <div style={{ height: config.headerHeight }}></div>
      <div className="fluid-container mt-3 mx-4 px-3 mt-5">
        <div className="text-center row text-white">
          <div style={{ fontSize: "70px" }}>
            <div style={{ fontWeight: 700 }}>DUOYIN</div>
          </div>
          <input
            type="text"
            className=" p-3 mb-5 bg-white border-0 col-lg-8 col-md-8 col-sm-12 text-center rounded"
            placeholder="Nhập từ cần tìm"
            style={{
              transform: "translate(-50%,0)",
              position: "relative",
              left: "50%",
              outline: "none",
            }}
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </div>
      <div className="row mx-0 justify-content-center">
        <div className="col-lg-10 col-12">
          <div
            className="row px-2 mx-0 col-12 
            justify-content-start overflow-auto"
            style={{ maxHeight: config.showWordHeight }}>
            {viewedDataList
              .filter((data) => data[config.wordIndex].includes(searchWord))
              .map((item, index) => {
                const isInActive = item[config.idIndex] == 37 || item[config.idIndex] == 66;
                if (isInActive) return;
                return(

                <Link
                  to={`${config.location}/${item[config.idIndex]}`}
                  className={`rounded col-md-2 col-lg-1 col-3 hover-bold hover-bigger2 hover-mouse lh-20 valign px-1 fs-20 ${isInActive ? 'l-disable' : ''}`}
                  style={{ maxWidth: "180px", textDecoration: "none" }}
                  
                  key={index - 1}>
                  <Card className={`rounded bg-darkBlue text-white ${isInActive ? 'd-none' : ''}`}>
                    {item[config.wordIndex]}
                  </Card>
                </Link>
                )
            })}
           {freshDataList
              .filter((data) => data[config.wordIndex].includes(searchWord))
              .map((item, index) => {
                const isInActive = item[config.idIndex] == 37 || item[config.idIndex] == 66;
                if (isInActive) return;
                return (
                  <Link
                    onClick={() => handleClick()}
                    to={`${config.location}/${item[config.idIndex]}`}
                    className={`rounded col-md-2 col-lg-1 col-3 hover-bold hover-bigger2 hover-mouse lh-20 valign px-1 fs-20 ${isInActive ? 'l-disable' : ''}`}
                    style={{ maxWidth: "180px", textDecoration: "none" }}
                    
                    key={index - 1}>
                    <Card className={`${isInActive ? 'd-none' : ''}`}>{item[config.wordIndex]}</Card>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoTayScreen;
