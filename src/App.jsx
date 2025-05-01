import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState({ code: 0, status: "" });
  const [number, setNumber] = useState(0);

  const fetchServer = async (uri) => {
    try {
      const res = await axios.get(`http://localhost:3000/${uri}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleHealthCheckClick = async () => {
    try {
      const res = await fetchServer("health");
      setStatus({ code: res.status, status: res.data.status });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRandomNumberClick = async () => {
    try {
      const res = await fetchServer("random");
      setNumber(res.data.randomNumber);
    } catch (error) {}
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleHealthCheckClick}>Check health</button>
        <button onClick={handleRandomNumberClick}>Get random number</button>
      </div>
      <p className="read-the-docs">
        Status: {`${status?.code}${status?.status.toUpperCase()}`}
      </p>
      <p className="read-the-docs">Number: {number}</p>
    </>
  );
}

export default App;
