import { useRef } from "react";
import "./App.css";

function App() {
  const videoEl = useRef();
  const videoEl2 = useRef();
  function openCam() {
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      console.log("getUserMedia() not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
      .then(function (vidStream) {
        var video = videoEl.current;
        if ("srcObject" in video) {
          video.srcObject = vidStream;
        } else {
          video.src = window.URL.createObjectURL(vidStream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (e) {
        console.log(e.name + ": " + e.message);
      });
  }
  return (
    <div className="App">
      <div>
        <video ref={videoEl}></video>
        <video ref={videoEl2}></video>
      </div>
      <button onClick={openCam}>open camera</button>
      <button onClick={openCam}>open camera2</button>
      <textarea placeholder="type something..."></textarea>
    </div>
  );
}

export default App;
