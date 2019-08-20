import React from "react";
import moment from "moment";

import * as temperatureConversion from "../../service/temperatureConversion";
import { capitalizeWords } from "../../service/capitalizeWords";

import "./style.css";

const DaysItem = props => {
  const { reading, showDetails, temperatureUnit } = props;

  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  const img = `owf owf-${reading.weather[0].id} owf-5x`;

  const celciusReading = reading.main.temp;
  const celcius = temperatureConversion.celcius(celciusReading);
  const fahrenheit = temperatureConversion.fahrenheit(celcius);

  const weatherSummary = capitalizeWords(reading.weather[0].description);

  return (
    <div className="col-lg-2 col-md-4 card-container-ui" onClick={showDetails}>
      <div className="card card-shadow">
        <h3 className="card-title card-header-ui">
          {moment(newDate).format("dddd")}
        </h3>
        <p className="text-muted">
          {moment(newDate).format("MMMM Do, h:mm a")}
        </p>
        <i className={img} />
        <h2>
          {temperatureUnit === "celcius" ? `${celcius}°C` : `${fahrenheit}°F`}
        </h2>
        <div className="card-body">
          <p className="card-text">{weatherSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default DaysItem;
