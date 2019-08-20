import React from "react";
import { ToastContainer } from "react-toastify";

import DaysList from "./containers/DaysList/DaysList";

import "./App.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App">
      <br />
      <DaysList />
      <ToastContainer />
    </div>
  );
};

export default App;
