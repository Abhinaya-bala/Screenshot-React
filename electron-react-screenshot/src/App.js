import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

function App() {
  const [disable, setDisabled] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startCapture = () => {
    //  console.log("clicked start");
    if (intervalId != null) {
      return;
    }
    ipcRenderer.send("takeScreenShot");
    console.log("image captured initial");

    const temp = setInterval(() => {
      ipcRenderer.send("takeScreenShot");
      console.log("image captured");
    }, 300000);
    setDisabled(true);
    setIntervalId(temp);
  };

  useEffect(() => {
    return () => {
      console.log("cleaned up check");
      stopCapture();
    };
  }, []);

  const stopCapture = () => {
    console.log("capture stoped", intervalId);
    clearInterval(intervalId);
    setIntervalId(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <p className="text-muted text-uppercase fs-1">
        Screen Capture Application
      </p>

      <p className="text-muted fst-italic">
        This application capture screen for every 5mins
      </p>
      <Button
        variant="success"
        size="sm"
        className="px-5 mx-2"
        disabled={disable}
        onClick={startCapture}
      >
        Start Capture
      </Button>
      <Button
        variant="danger"
        size="sm"
        className="px-5 mx-2"
        onClick={stopCapture}
        disabled={!disable}
      >
        Stop Capture
      </Button>
    </div>
  );
}

export default App;
