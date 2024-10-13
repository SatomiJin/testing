import React from "react";
import Data from "./Data/data";
import { useCookies } from "react-cookie";
function App() {
  var myArray = [];

  var jsonStr = JSON.stringify(myArray);

  var allCookies = document.cookie;
  // Kiểm tra xem cookie có tồn tại không
  var existingCookieValue = allCookies.split("; ").find((row) => row.startsWith("viewedWordList="));
  if (!existingCookieValue)
    document.cookie =
      "viewedWordList=" + jsonStr + "; expires=" + new Date(Date.now() + 7 * 864e5).toUTCString() + "; path=/";

  return (
    <>
      <Data />
    </>
  );
}

export default App;
