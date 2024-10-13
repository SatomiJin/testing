import React, { useRef } from "react";

function AudioButton({ index, content, wordId }) {
  //   const audioRef = useRef(); // Create a ref
  const realId = wordId + "." + (index + 1) + ".mp3";
  let audio = new Audio(require(`./audio/${realId}`));
  const playAudio = () => {
    audio.play();
    console.log(realId);
    // audioRef.current.play(); // Use the ref to play the audio
  };

  return (
    <div>
      <button onClick={playAudio} className="border-0 bg-white">
        <i className="bi bi-volume-up-fill"></i>
        <span>{content}</span>
      </button>
    </div>
  );
}

export default AudioButton;
