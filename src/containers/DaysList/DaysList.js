import React, { Component } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import Geosuggest from "react-geosuggest";
import axios from "axios";

import DaysItem from "../../components/DaysItem/DaysItem";
import DetailedDaysItem from "../../components/DetailedDaysItem/DetailedDaysItem";
import TemperatureToggle from "../../components/TemperatureToggle/TemperatureToggle";

import apiConfig from "../../apiKeys";
import "./style.css";

class DaysList extends Component {
  state = {
    previousCity: "Winnipeg",
    city: "Winnipeg",
    country: "CA",
    weatherReading: [],
    detailedReading: {},
    isWeatherDataFetched: false,
    temperatureUnit: "celcius",
    isDetailsVisible: false
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${
      this.state.city
    },${this.state.country}&units=metric&APPID=${apiConfig.openWeatherKey}`;

    axios
      .get(url)
      .then(response => {
        toast.success("Weather data succesfully loaded");

        const weatherReading = response.data.list.filter(reading =>
          reading.dt_txt.includes("18:00:00")
        );

        this.setState({
          weatherReading: weatherReading,
          isWeatherDataFetched: true,
          previousCity: this.state.city
        });
      })
      .catch(error => {
        const errorMessage =
          error.response.data.message[0].toUpperCase() +
          error.response.data.message.slice(1);

        toast.error(errorMessage);
      });
  };

  resetFetchedState = () => {
    this.setState({
      isWeatherDataFetched: false
    });
  };

  onSuggestSelect = place => {
    this.resetFetchedState();

    let city = this.state.city;
    let country = this.state.country;

    if (place !== undefined) {
      let filteredCity = place.gmaps.address_components.filter(
        data => data.types[0] === "locality"
      );

      filteredCity.length > 0
        ? (city = filteredCity[0].long_name)
        : (city = this.state.city);

      country = place.gmaps.address_components.filter(
        data => data.types[0] === "country"
      )[0].short_name;

      this.setState({
        city: city,
        country: country
      });

      if (city !== this.state.previousCity) {
        this.fetchWeatherData();
      }
    }
  };

  toggleTemperature = temperatureUnit => {
    this.setState({ temperatureUnit: temperatureUnit });
  };

  showDetails = reading => {
    this.setState({
      isDetailsVisible: true,
      detailedReading: reading
    });
  };

  closeDetailsModal = () => {
    this.setState({
      isDetailsVisible: false
    });
  };

  render() {
    const google = window.google;
    const isSameCity = this.state.city === this.state.previousCity;

    let daysCard = (
      <div className="days-card-spinner">
        <Spin size="large" />
      </div>
    );

    if (
      this.state.isWeatherDataFetched ||
      (!this.state.isWeatherDataFetched && isSameCity)
    ) {
      daysCard = this.state.weatherReading.map((reading, index) => {
        return (
          <DaysItem
            reading={reading}
            key={index}
            temperatureUnit={this.state.temperatureUnit}
            showDetails={() => this.showDetails(reading)}
          />
        );
      });
    }

    return (
      <div className="container">
        <h1 className="display-1 jumbotron weather-title">5-DAY FORECAST</h1>
        <h5 className="display-4 text-muted city-header">
          {this.state.city}, {this.state.country}
        </h5>
        <div className="input-container">
          <Geosuggest
            placeholder="Search City"
            initialValue={this.state.city}
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(49.895136, -97.13837439999998)}
            radius="20"
            types={["(cities)"]}
          />
          <TemperatureToggle toggleTemperature={this.toggleTemperature} />
        </div>
        <div className="row justify-content-center">{daysCard}</div>
        {this.state.isDetailsVisible && (
          <DetailedDaysItem
            weatherData={this.state.detailedReading}
            closeModal={this.closeDetailsModal}
            isModalVisible={this.state.isDetailsVisible}
            temperatureUnit={this.state.temperatureUnit}
            city={this.state.city}
          />
        )}
      </div>
    );
  }
}

export default DaysList;
