import React from "react";
import { Switch } from "antd";

import "./style.css";

const TemperatureToggle = props => {
  const changeTemperatureUnit = checked => {
    checked
      ? props.toggleTemperature("celcius")
      : props.toggleTemperature("fahrenheit");
  };

  return (
    <div className="temperature-toggle-container">
      <div className="temperature-unit">°F</div>
      <Switch defaultChecked onChange={changeTemperatureUnit} />
      <div className="temperature-unit">°C</div>
    </div>
  );
};

export default TemperatureToggle;
