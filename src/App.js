import React, { Component } from 'react';
import './App.css';

import cloud from "./assets/cloud.png";
import cloud1 from "./assets/cloud1.png";


import upArrow from "./assets/up-arrow.png";
import downArrow from "./assets/down-arrow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import WeatherCard from './components/weather-card/weatherCard.component';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      city: "",
      country: "",
      sys: [],
      coord: [],
      main: [],
      wind: []
    }

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData(city = "yazd") {
    const apiKey = "8a97c3b8e3b9989c1d854dd1092eb7c6";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(url);
    const result = await response.json();
    console.log("here " + result.sys.country)
    this.setState({
      city: city,
      temp: result.sys,
      data: result
    });
    console.log(this.state.data);
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div className="container">

          <div className="current-weather">
            <div className="informations">
              <h1 className="city">
                <span>{data.name}, </span>
                <span></span>
              </h1>

              <h4 className="time">20:45:18</h4>

              <h4 className="date">September 25, 2015</h4>

              <div className="weather-condition">
                <img className="weather-image" src={cloud1} alt="weather" />
                <span>cloudy</span>
              </div>
            </div>

            <div className="details">
              <div className="temperature-container">
                <div className="lowest">
                  <img className="arrow" src={downArrow} alt="arrow" />
                  <span>19&#176;</span>
                </div>

                <span className="temperature">35 C&#176;
                </span>

                <div className="highest">
                  <span>34&#176;</span>
                  <img className="arrow" src={upArrow} alt="arrow" />
                </div>
              </div>

              <div className="weather-parameters">
                <div className="wind">
                  <img src={windIcon} alt="icon" />
                  <span>108 m/s</span>
                </div>

                <div className="humidity">
                  <img src={humidityIcon} alt="icon" />
                  <span>14 %</span>
                </div>
              </div>
            </div>

            <div className="hour-forecast">
              <WeatherCard cardClass="small-card" hour="14 PM" image={cloud} temperature="56" />
              <WeatherCard cardClass="small-card" hour="14 PM" image={cloud} temperature="56" />
              <WeatherCard cardClass="small-card" hour="14 PM" image={cloud} temperature="56" />
              <WeatherCard cardClass="small-card" hour="14 PM" image={cloud} temperature="56" />
              <WeatherCard cardClass="small-card" hour="14 PM" image={cloud} temperature="56" />
            </div>
          </div>

          <div className="search">
            <div className="search-box">
              <input className="search-input" id="search" type="text" placeholder="Search City" />
              <button type="submit"
                onClick={() => this.getData(document.getElementById("search").value)}>
                Search</button>
            </div>
          </div>

          <div className="forecast-weather">
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
            <WeatherCard cardClass="big-card" hour="Tuesday" image={cloud} temperature="27" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
