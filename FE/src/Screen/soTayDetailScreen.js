import NavBarCpn from "../Component/navBarCpn";
import React, { useState, useEffect , useRef} from "react";
import { useLocation, Link } from "react-router-dom";
import AudioButton from "../Component/audioBtn";
import { useCookies } from "react-cookie";
import axios from "axios";

function SoTayDetailScreen(props) {
  const config = {
    ...props.config,
    location: useLocation().pathname,
    data: props.data,
    headerHeight: window.innerWidth < 1000 ? 140 : 120,
    baseSideFontSize: window.innerWidth < 1000 ? "17px" : "26px",
    gifMaxSize: window.innerWidth < 1000 ? "240px" : "350px",
  };
  const urlList = config.location.split("/");
  const wordId = urlList[urlList.length - 1];
  const wordFileName = wordId + ".gif";
  const [wordGifLink, setWordGifLink] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://www.googleapis.com/drive/v3/files?key=${config.API_Key}&q=name='${wordFileName}' and '${config.wordDrawFolderDriveId}' in parents`;
        const response = await axios.get(url);
        const files = response.data.files;
        if (files && files.length > 0) {
          setWordGifLink(config.baseLinkDrive + files[0].id);
          console.log(wordGifLink);
        } else {
          throw new Error("File not found.");
        }
      } catch (error) {
        throw new Error("Error retrieving file:", error);
      }
    };

    fetchData();
  }, []);

  const data = props.data.find((item) => item[config.idIndex] === wordId);

  const tableData = data ? data.slice(config.amDoc_1_Index) : [];
  const rows = [];
  function getCookie(name) {
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePair = cookieArray[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  var viewedWordList = JSON.parse(getCookie("viewedWordList"));
  viewedWordList = viewedWordList ? viewedWordList : [];
  if (viewedWordList.find((element) => element === wordId)) {
    let index = viewedWordList.indexOf(wordId);
    viewedWordList.splice(index, 1);
  }
  viewedWordList.unshift(wordId);
  var jsonStr = JSON.stringify(viewedWordList);
  document.cookie =
    "viewedWordList=" +
    jsonStr +
    "; expires=" +
    new Date(Date.now() + 7 * 864e5).toUTCString() +
    "; path=/";

  for (let i = 0; i < tableData.length; i += config.amDocLength) {
    rows.push(tableData.slice(i, i + config.amDocLength));
  }
  console.log(rows);

  const handleClick = () => {
    const sound = document.getElementById("sound");
    sound.play();
    console.log("clicked");
  };
  return (
    <div className="bg-white">
      <NavBarCpn config={config} />
      <div style={{ height: config.headerHeight }}></div>
      <div className="row mx-0 pb-5 justify-content-center">
        <div className="text-center fs-1 col-lg-10 col-12">
          {data ? (
            <div>
              <div className="container row pb-3 mx-0 px-0">
                <div className="fw-bold col" style={{ fontSize: "150px" }}>
                  <div className="container">
                    <img
                      src={wordGifLink}
                      style={{ maxHeight: config.gifMaxSize }}
                    />
                  </div>
                </div>
                <div
                  className="fw-bold col valign"
                  style={{ fontSize: config.baseSideFontSize }}>
                  <div className="row valign">
                    <div className="border border-black mt-5 mb-3">
                      {data ? data[config.soNetVeIndex] + " nét vẽ" : "Loading"}
                    </div>
                    <div className="border border-black">
                      {data[config.soAmDocIndex] + " âm đọc"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-0 mt-4">
                <div className="container-fluid fs-5 text-start border border-black mx-0">
                  <div className="row">
                    <div className="border border-black col-lg-1 text-white fw-bold bg-darkRed col-4">
                      STT
                    </div>
                    <div className="border border-black col-lg-1 text-white fw-bold bg-darkRed col-4">
                      Phiên âm
                    </div>
                    <div className="border border-black col-lg-1 text-white fw-bold bg-darkRed col-4">
                      Từ loại
                    </div>
                    <div className="border border-black col-lg-9 text-white fw-bold bg-darkRed col-12">
                      <div className="row h-100">
                        <div className="col">Giải thích</div>
                        <div className="col border-2 border-start border-black">
                          Ví dụ
                        </div>
                      </div>
                    </div>
                  </div>
                  {rows.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="border border-black col-lg-1 col-4">
                        {index + 1}
                      </div>
                      <div className="border border-black col-lg-1 col-4">
                        <AudioButton content={item[0]} wordId= {wordId} index = {index}></AudioButton>
                      </div>
                      <div className="border border-black col-lg-1 col-4">
                        {item[1]}
                      </div>
                      <div className="border border-black col-lg-9 col-12">
                        <div className="row h-100">
                          <div className="col">
                            {item[2].split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="col border-2 border-start border-black">
                            {item[3].split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
}

export default SoTayDetailScreen;
