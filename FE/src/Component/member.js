import React from "react";

const Member = () => {
    return (
        <div className="py-5" style={{background:"#115185", color: "#ffffff"}}>
            <div className="c-darkBlue fw-bold text-center text-white" style={{ fontSize: "50px" }}>
              Nhóm nghiên cứu
            </div>
            <div className="c-darkBlue fw-mdfst-italic text-center mt-2 text-white" style={{ fontSize: "30px" }}>
            Sinh viên khóa 47 Khoa Tiếng Trung Trường Đại học Sư phạm Thành phố Hồ Chí Minh
            </div>
            <div className="d-flex flex-row justify-content-around mt-5 mx-4 pt-2">
                <div className="text-center">
                    <a href="https://www.facebook.com/yenthao.le.568?mibextid=ZbWKwL">
                        <img src={require("../Public/Assets/NTTA.jpg")} alt="" className="shadow rounded-circle mb-4 border border-4  border-white" width="220px" height="220px"/>
                    </a>
                    <h4>Nguyễn Thị Tố An</h4>
                </div>
                <div className="text-center">
                    <a href="https://www.facebook.com/people/Truc-Thanh/pfbid02sV9mjkdgcuYW9a2vmXoovqTPEw1htLyqfG77jp7EYCNJuuvDhZaXiaMsZxqRQ65fl/?mibextid=ZbWKwL">
                        <img src={require("../Public/Assets/NTTT.jpeg")} alt="" className="shadow rounded-circle mb-4  border border-4  border-white" width="220px" height="220px"/>
                    </a>
                    <h4>Nguyễn Thị Thanh Trúc</h4>
                </div>
                <div className="text-center">
                    <a href="https://www.facebook.com/people/Gia-Linh/pfbid08o2pstRj8FnUnBZsP6CFXoRW49by33SqefrsFP4Q17B2iztRG94YLUzUTZQyFkohl/?mibextid=ZbWKwL">
                        <img src={require("../Public/Assets/LGL.jpg")} alt="" className="shadow rounded-circle mb-4 border border-4  border-white" width="220px" height="220px"/>
                    </a>
                    <h4>Lư Gia Linh</h4>
                </div>
                <div className="text-center">
                    <a href="https://www.facebook.com/people/Buudinh-Huynh/pfbid02DURDgJ3WhH4PznRAgMNzuCFC5MWup47H5Q4iSzYwoRoiyaBDnJwU1yhSPDXUVGn2l/?mibextid=ZbWKwL">
                        <img src={require("../Public/Assets/HBD.jpg")} alt="" className="shadow rounded-circle mb-4 border border-4  border-white" width="220px" height="220px"/>
                    </a>
                    <h4>Huỳnh Bửu Dinh</h4>
                </div>
                <div className="text-center">
                    <a href="https://www.facebook.com/people/T%C3%A0o-Tuy%E1%BA%BFt-Linh/pfbid0B4dXA6t9p3ykmuzFvuGVh4xaGbKVpCiG9SxEFu24hVCGcXo7PygZ6aEDAB8YEgFil/?mibextid=ZbWKwL">
                        <img src={require("../Public/Assets/TTL.jpg")} alt="" className="shadow rounded-circle mb-4 border border-4  border-white" width="220px" height="220px"/>
                    </a>
                    <h4>Tào Tuyết Linh</h4>
                </div>
            </div>
        </div>
    );
    }
export default Member;

