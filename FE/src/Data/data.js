import React, { useState, useEffect } from "react";
import "../Public/style.css";
import { HashRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Footer from "../Component/footerCpn";

import SoTayScreen from "../Screen/soTayScreen";
import BaiTapScreen from "../Screen/baiTapScreen";
import TrangChuScreen from "../Screen/trangChu";
import TongQuanScreen from "../Screen/tongQuan";
import VideoScreen from "../Screen/video";
import SoTayDetailScreen from "../Screen/soTayDetailScreen";
function Data() {
  const [soTayData, setSoTayData] = useState([]);
  const [baiTapData, setBaiTapData] = useState([]);
  const [wordDrawDrive, setWordDrawDrive] = useState([]);
  const config = {
    pageIndex: 2,
    wordIndex: 1,
    amDoc_1_Index: 5,
    idIndex: 0,
    amDocLength: 4,
    soTayDataStartRow: 1,
    baiTapDataStartRow: 1,
    soNetVeIndex: 2,
    soAmDocIndex: 4,
    linkGifIndex: 3,
    soCauBaiTap: 20,
    dataBaiTapRows: 100,
    dataSoTayRows: 100,
    API_Key: "AIzaSyBXm1shuz4qwkvMsNA1hnb4aGVxi2i6xbE",
    wordDrawFolderDriveId: "1pKB7Ww60X5FwhR-bSR8yzVHGG01MeOgE",
    baseLinkDrive: "https://drive.google.com/thumbnail?id=",
    googleSheetId: "1fSWPkmCz8zNjGquFN0yIOpP_p578t0ij-RERcHxoDr0",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSheetId}/values/soTay?key=` + config.API_Key
        );
        setSoTayData(
          response.data.values.splice(config.soTayDataStartRow)
          // .sort((a, b) => a[4].localeCompare(b[4]))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSheetId}/values/baiTap?key=` + config.API_Key
        );
        setBaiTapData(response.data.values.splice(config.baiTapDataStartRow));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="bg-darkBlue">
      <HashRouter>
        <Routes>
          <Route path={"/trangChu"} element={<TrangChuScreen config={config} />} />
          <Route path={"/tongQuan"} element={<TongQuanScreen config={config} />} />
          <Route path={"/soTay"} element={<SoTayScreen data={soTayData} config={config} />} />
          <Route path={`/soTay/:id`} element={<SoTayDetailScreen data={soTayData} config={config} />} />

          <Route path={"/baiTap"} element={<BaiTapScreen data={baiTapData} config={config} />} />
          <Route path={"/video"} element={<VideoScreen data={soTayData} />} />
          {/* <Route
            path={"/baiTap/{id}"}
            element={<HoTroScreen data={soTayData} />}
          /> */}
          <Route path="*" element={<Navigate to={"/trangChu"} />} />
        </Routes>
      </HashRouter>

      <Footer config={config} />
    </div>
  );
}

export default Data;
