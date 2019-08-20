import React from "react";
import { Modal, Button } from "antd";
import moment from "moment";

import * as temperatureConversion from "../../service/temperatureConversion";
import { capitalizeWords } from "../../service/capitalizeWords";

import "./style.css";

const DetailedDaysItem = props => {
  const {
    weatherData,
    closeModal,
    isModalVisible,
    temperatureUnit,
    city
  } = props;

  let newDate = new Date();
  const weekday = weatherData.dt * 1000;
  newDate.setTime(weekday);

  const img = `owf owf-${weatherData.weather[0].id} owf-5x`;

  const celciusReading = weatherData.main.temp;
  const celcius = temperatureConversion.celcius(celciusReading);
  const fahrenheit = temperatureConversion.fahrenheit(celcius);

  const humidity = weatherData.main.humidity;
  const pressure = Math.round(weatherData.main.pressure);
  const wind = Math.round(weatherData.wind.speed);

  const weatherSummary = capitalizeWords(weatherData.weather[0].description);

  return (
    <div>
      <Modal
        title={city.toUpperCase()}
        visible={isModalVisible}
        centered
        closable={false}
        onCancel={closeModal}
        footer={[
          <Button key="back" type="danger" onClick={closeModal}>
            Close
          </Button>
        ]}
      >
        <div>
          <div className="detailed-weather-header">
            <div>
              <h2 className="card-title card-header-ui">
                {moment(newDate).format("dddd")}
              </h2>
              <p className="text-muted">
                {moment(newDate).format("MMMM Do, h:mm a")}
              </p>
            </div>
            <div className="detailed-weather-header-temp">
              <h2>
                {temperatureUnit === "celcius"
                  ? `${celcius}°C`
                  : `${fahrenheit}°F`}
              </h2>
              <p className="card-text">{weatherSummary}</p>
            </div>
          </div>
          <div className="detailed-weather-container">
            <i className={img} />
            <div className="detailed-weather-info">
              <div>Humidity: {humidity}%</div>
              <div>Pressure: {pressure} hPa</div>
              <div>Wind: {wind} km/h</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailedDaysItem;
