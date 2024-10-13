import NavBarCpn from "../Component/navBarCpn";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from "react-router-dom";
import "./ScreenCss/baiTapScreen.css";

function BaiTapScreen(props) {
  const [Type, setType] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [Check, setCheck] = useState(false);
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState("");
  const config = {
    ...props.config,
    location: useLocation().pathname,
    data: props.data,
    showQuestionsHeight: window.innerWidth < 1000 ? 550 : 650,
    headerHeight: window.innerWidth < 1000 ? 100 : 70,
  };
  var data = config.data;
  if (!data) data = [];

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

  function getDataABCD(text) {
    const words = text.split("A.");
    const qs = words[0];

    const words1 = words[1].split("B.");
    const A = words1[0];

    const words2 = words1[1].split("C.");
    const B = words2[0];

    const words3 = words2[1].split("D.");
    const C = words3[0];

    const words4 = words3[1];
    const D = words4;
    return [qs, [A, B, C, D]];
  }

  function isHanCharacter(char) {
    // Biểu thức chính quy kiểm tra xem char có phải là chữ Hán hoặc dấu
    const hanAndPunctuationRegex = /^[\u4e00-\u9fa5，。“” ？" , ！ 、0123456789 ： 》《 ·]$/;
    return hanAndPunctuationRegex.test(char);
  }

  function getRandomNumbers() {
    var randomIndices = [];
    var baseRandomNumbers = [];
    for (var i = 0; i < config.dataBaiTapRows; i++) {
      baseRandomNumbers.push(i + 1);
    }
    for (var i = 0; i < config.soCauBaiTap; i++) {
      var randomNumber = Math.floor(Math.random() * (config.dataBaiTapRows - i));
      randomIndices.push(baseRandomNumbers[randomNumber]);
      baseRandomNumbers.splice(randomNumber, 1);
      baseRandomNumbers.push(randomNumber);
    }
    return randomIndices;
  }

  function selectType(type) {
    const count = config.soCauBaiTap;
    setResult("");
    // Your logic here'
    var viewedWordList = JSON.parse(getCookie("viewedWordList"));
    var randomIndices = [];
    if (viewedWordList.length > count) {
      randomIndices = viewedWordList.slice(0, count);
      // Update viewdWordList
      viewedWordList = viewedWordList.slice(count);
      var jsonStr = JSON.stringify(viewedWordList);
      document.cookie =
        "viewedWordList=" + jsonStr + "; expires=" + new Date(Date.now() + 7 * 864e5).toUTCString() + "; path=/";
    } else {
      randomIndices = viewedWordList;
      var myArray = [];
      var jsonStr = JSON.stringify(myArray);
      document.cookie =
        "viewedWordList=" + jsonStr + "; expires=" + new Date(Date.now() + 7 * 864e5).toUTCString() + "; path=/";
    }
    var randomIndex = 0;
    var dataLength = data.length;

    // var baseRandomNumbers = [];
    // for (var i = 0; i < config.dataBaiTapRows; i++) {
    //   baseRandomNumbers.push(i);
    // }
    // for (var i = 0; i < config.soCauBaiTap; i++) {
    //   var randomNumber = Math.floor(
    //     Math.random() * (config.dataBaiTapRows - i)
    //   );
    //   randomIndices.push(baseRandomNumbers[randomNumber]);
    //   baseRandomNumbers.splice(randomNumber, 1);
    //   baseRandomNumbers.push(randomNumber);
    // }
    randomIndices = getRandomNumbers();

    var dataRandom = [];
    if (data.length > 0) {
      randomIndices.map((index) => dataRandom.push(data[parseInt(index) - 1] ? data[parseInt(index) - 1] : 0));
    }
    setType(type);
    setCheck(false);
    setResponses([]);
    setQuestions(dataRandom);
  }
  const handleInputChange = (questionId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value.trim(),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(responses);
    if (responses.length < questions.length) {
      alert("Bạn vẫn chưa hoàn thành bài tập");
    } else {
      const correctAnswers = questions.filter((q) => responses[q[0]] === q[Type * 2 + 1]);
      const score = correctAnswers.length;
      setResult(`Bạn đã trả lời đúng ${score} trên tổng số ${questions.length} câu hỏi.`);
      setCheck(true);
      window.scrollTo(0, 0);
    }
  };
  const handleResetForm = () => {
    setQuestions([]);
    setResult(``);
    setCheck(false);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="bg-white">
        <NavBarCpn config={config} />
        <div style={{ height: config.headerHeight }}></div>
        <div className="fluid-container mt-3 px-2 mt-5">
          <div className="text-center pb-1">
            <div style={{ fontSize: "90px" }}>
              <div className="c-lightRed  position-relative z-index-5" style={{ fontWeight: 700 }}>
                DUOYIN
              </div>
            </div>
            <div className="c-darkBlue fw-bold text-center" style={{ fontSize: "50px" }}>
              Bài tập
            </div>
            <div className="c-darkBlue fw-light fst-italic text-center" style={{ fontSize: "30px" }}>
              Chọn một trong số các dạng bài tập dưới đây để bắt đầu
            </div>
          </div>
          <div className="">
            <div className="container text-white">
              <div className="row" style={{ gap: ".5rem", alignItems: "center", justifyContent: "center" }}>
                <div className="col-lg-5 col-md-5 col-sm-12" onClick={() => selectType(1)}>
                  <div
                    className={`text-bold ${
                      Type == 1 ? "bg-darkBlue" : "bg-lightBlue"
                    }  hover-darkBlue py-4 fw-bold ps-5 hover-mouse h-100 rounded-pill`}
                  >
                    1. Điền phiên âm
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12" onClick={() => selectType(2)}>
                  <div
                    className={`text-bold ${
                      Type == 2 ? "bg-darkBlue" : "bg-lightBlue"
                    }  hover-darkBlue py-4 fw-bold ps-5 hover-mouse h-100 rounded-pill`}
                  >
                    2. Chọn nghĩa tương ứng
                  </div>
                </div>
              </div>
            </div>

            <div className="container text-white">
              <div
                className="row"
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                  gap: ".5rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="col-lg-5 col-md-5 col-sm-12" onClick={() => selectType(3)}>
                  <div
                    className={`text-bold ${
                      Type == 3 ? "bg-darkBlue" : "bg-lightBlue"
                    }  hover-darkBlue py-4 fw-bold ps-5 hover-mouse h-100 rounded-pill`}
                  >
                    3. Chọn câu chữ Hán tương ứng
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12" onClick={() => selectType(4)}>
                  <div
                    className={`text-bold ${
                      Type == 4 ? "bg-darkBlue" : "bg-lightBlue"
                    }  hover-darkBlue py-4 fw-bold ps-5 hover-mouse h-100 rounded-pill`}
                  >
                    4. Phán đoán đúng sai
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fw-bold text-center mb-1">{result}</div>
          <div className="overflow-auto border-top border-black pt-4" style={{ maxHeight: config.showQuestionsHeight }}>
            {Type === 1 && (
              <div className="">
                <form onSubmit={handleSubmit} className="row">
                  {questions.map((question, index) => (
                    <div className="mb-3 px-3">
                      <div className="b-darkBlue border-4 px-3 py-2 rounded">
                        <div key={question[0]} className="">
                          <div>
                            {question[Type * 2] && (
                              <div>
                                {index + 1}.{" "}
                                {question[Type * 2].split("").map((char, index) => (
                                  <span
                                    key={index}
                                    style={
                                      char === question[1] &&
                                      index > 0 &&
                                      (question[Type * 2][index - 1] === "(" || question[Type * 2][index - 1] === "（")
                                        ? { color: "red", fontWeight: "bold" }
                                        : { color: "inherit" }
                                    }
                                  >
                                    {char}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {Check ? (
                            <div>
                              {responses[question[0]] && responses[question[0]] === question[Type * 2 + 1] ? (
                                <input
                                  style={{ backgroundColor: "#90EE90" }}
                                  type="text"
                                  name={`question_${question[0]}`}
                                  className="border border-1 border-black p-2  my-3"
                                  onChange={(e) => handleInputChange(question[0], e.target.value)}
                                  readOnly
                                />
                              ) : (
                                <input
                                  style={{ backgroundColor: "#ffcccc" }}
                                  type="text"
                                  name={`question_${question[0]}`}
                                  className="border border-1 border-black p-2  my-3"
                                  onChange={(e) => handleInputChange(question[0], e.target.value)}
                                  readOnly
                                />
                              )}

                              <div className="c-darkRed" style={{ fontWeight: "bold" }}>
                                Đáp án : {question[Type * 2 + 1]}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <input
                                type="text"
                                name={`question_${question[0]}`}
                                className="border border-black p-2 mt-2 form-control"
                                // value={responses[question[0]] || ''}
                                // required
                                onChange={(e) => handleInputChange(question[0], e.target.value)}
                              />
                              {/* <div>{question[Type * 2 + 1]} </div> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {!Check && questions.length > 0 && (
                    <div className="text-center row mx-0 justify-content-center">
                      <div className="col">
                        <button
                          type="submit"
                          className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                        >
                          Nộp bài
                        </button>
                      </div>
                    </div>
                  )}
                  {Check && (
                    <div className="text-center row mx-0 justify-content-center">
                      <div className="col">
                        <button
                          type="button"
                          onClick={() => handleResetForm()}
                          className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                        >
                          Làm lại
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}

            {Type === 2 && (
              <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div className="mb-3 px-3">
                    <div className="b-darkBlue border-4 px-3 py-2 rounded">
                      <div style={{ marginBottom: "1em" }}>
                        {" "}
                        {/* Ensure the key is unique */}
                        <div className="mb-2">
                          {index + 1}.{" "}
                          {getDataABCD(question[Type * 2])[0]
                            .split("")
                            .map((char, index) => (
                              <span
                                style={
                                  isHanCharacter(char) ? { color: "inherit" } : { color: "red", fontWeight: "bold" }
                                }
                              >
                                {char}
                              </span>
                            ))}
                        </div>
                        {getDataABCD(question[Type * 2])[1].map((option, i) =>
                          Check && responses[question[0]] && responses[question[0]] === String.fromCharCode(65 + i) ? (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              {responses[question[0]] !== question[Type * 2 + 1] ? (
                                <div style={{ color: "red", fontWeight: "bold" }}>
                                  {String.fromCharCode(65 + i)}.{" "}
                                  <label key={i}>
                                    <input
                                      key={i}
                                      type="radio"
                                      name={`question_${question[0]}`}
                                      checked={true}
                                      onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                    />

                                    {option}
                                  </label>
                                </div>
                              ) : (
                                <div style={{ color: "green", fontWeight: "bold" }}>
                                  {String.fromCharCode(65 + i)}.{" "}
                                  <label key={i}>
                                    <input
                                      key={i}
                                      type="radio"
                                      name={`question_${question[0]}`}
                                      checked={true}
                                      onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                    />

                                    {option}
                                  </label>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ marginRight: "0.5em" }}>{String.fromCharCode(65 + i)}.</div>
                              <label key={i}>
                                <input
                                  type="radio"
                                  name={`question_${question[0]}`}
                                  onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                />
                                {option}
                              </label>
                            </div>
                          )
                        )}
                        {Check && (
                          <div className="c-darkRed" style={{ fontWeight: "bold" }}>
                            Đáp án : {question[Type * 2 + 1]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {!Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="submit"
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Nộp bài
                      </button>
                    </div>
                  </div>
                )}
                {Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => handleResetForm()}
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Làm lại
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {Type === 3 && (
              <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div className="mb-3 px-3">
                    <div className="b-darkBlue border-4 px-3 py-2 rounded">
                      <div style={{ marginBottom: "1em" }}>
                        {" "}
                        {/* Ensure the key is unique */}
                        <div className="mb-2">
                          {index + 1}. {getDataABCD(question[Type * 2])[0]}
                        </div>
                        {getDataABCD(question[Type * 2])[1].map((option, i) =>
                          Check && responses[question[0]] && responses[question[0]] === String.fromCharCode(65 + i) ? (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              {responses[question[0]] !== question[Type * 2 + 1] ? (
                                <div style={{ color: "red", fontWeight: "bold" }}>
                                  {String.fromCharCode(65 + i)}.{" "}
                                  <label key={i}>
                                    <input
                                      key={i}
                                      type="radio"
                                      name={`question_${question[0]}`}
                                      checked={true}
                                      onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                    />

                                    {option}
                                  </label>
                                </div>
                              ) : (
                                <div style={{ color: "green", fontWeight: "bold" }}>
                                  {String.fromCharCode(65 + i)}.{" "}
                                  <label key={i}>
                                    <input
                                      key={i}
                                      type="radio"
                                      name={`question_${question[0]}`}
                                      checked={true}
                                      onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                    />

                                    {option}
                                  </label>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ marginRight: "0.5em" }}>{String.fromCharCode(65 + i)}.</div>
                              <label key={i}>
                                <input
                                  type="radio"
                                  name={`question_${question[0]}`}
                                  onChange={() => handleInputChange(question[0], String.fromCharCode(65 + i))}
                                />
                                {option}
                              </label>
                            </div>
                          )
                        )}
                        {Check && (
                          <div className="c-darkRed" style={{ fontWeight: "bold" }}>
                            Đáp án : {question[Type * 2 + 1]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {!Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="submit"
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Nộp bài
                      </button>
                    </div>
                  </div>
                )}
                {Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => handleResetForm()}
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Làm lại
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {Type === 4 && (
              <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                  <div key={question[0]}>
                    <div className="mb-3 px-3">
                      <div className="b-darkBlue border-4 px-3 py-2 rounded">
                        <div className="mb-1">
                          {index + 1}.{" "}
                          {question[Type * 2].split("").map((char, index) => (
                            <span
                              key={index}
                              style={isHanCharacter(char) ? { color: "inherit" } : { color: "red", fontWeight: "bold" }}
                            >
                              {char}
                            </span>
                          ))}
                        </div>

                        {Check ? (
                          <div>
                            {responses[question[0]] && responses[question[0]] === question[Type * 2 + 1] ? (
                              <input
                                style={{ backgroundColor: "#90EE90" }}
                                type="text"
                                className="p-2  my-3"
                                name={`question_${question[0]}`}
                                onChange={(e) => handleInputChange(question[0], e.target.value)}
                                readOnly
                              />
                            ) : (
                              <input
                                style={{ backgroundColor: "#ffcccc" }}
                                type="text"
                                name={`question_${question[0]}`}
                                className="p-2  my-3"
                                // value={responses[question.id] || ''}
                                onChange={(e) => handleInputChange(question[0], e.target.value)}
                                readOnly
                              />
                            )}

                            <div style={{ color: "red", fontWeight: "bold" }}>Đáp án : {question[Type * 2 + 1]}</div>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="text"
                              name={`question_${question[0]}`}
                              className="p-2  mt-2"
                              // value={responses[question.id] || ''}
                              onChange={(e) => handleInputChange(question[0], e.target.value)}
                            />
                            {/* <div>{question[Type * 2 + 1]} </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {!Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="submit"
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Nộp bài
                      </button>
                    </div>
                  </div>
                )}
                {Check && (
                  <div className="text-center row mx-0 justify-content-center">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => handleResetForm()}
                        className="text-white fw-bold px-5 py-3 border-0 text-center rounded-0 mb-3 bg-darkBlue"
                      >
                        Làm lại
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BaiTapScreen;
