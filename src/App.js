import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logins from "./component/Logins";
import "./App.css";
import Sign from "./component/Sign";
import Task from "./component/Task";
import Weather from "./component/Weather";
import Calculator from "./component/Calculator";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Logins />} />
        <Route path="/" element={<Sign />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/Weather" element={<Weather />} />
        <Route path="/task/Calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
