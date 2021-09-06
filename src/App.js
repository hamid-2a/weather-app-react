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
      sys: [],
      main: [],
      wind: [],
      weather: [],
      time: {
        hour: "",
        minute: "",
        second: ""
      },
      date: {
        day: "",
        month: "",
        year: ""
      }
    }

  }

  componentDidMount() {
    console.log("component mounted")
    this.getData();
    console.log("getData invoked")
    this.getTime();
  }

  getTime = () => {
    setInterval(
      () => {
        var now;
        now = new Date();
        this.setState({
          time: {
            hour: now.getHours() < 10 ? "0" + now.getHours() : now.getHours(),
            minute: now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes(),
            second: now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
          },
          date: {
            day: now.getDate(),
            month: now.toLocaleString('default', { month: 'long' }),
            year: now.getFullYear()
          }
        })
      },
      1000
    )
  }

  getData = async (city = "yazd") => {
    const apiKey = "8a97c3b8e3b9989c1d854dd1092eb7c6";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    const result = await response.json();
    console.log("setState invoked");
    this.setState({
      city: city,
      data: result,
      sys: result.sys,
      main: result.main,
      wind: result.wind,
      weather: result.weather
    });
    console.log("setState done");
    console.log(result);
    // console.log(this.state.data);
    console.log("fetch done");
  }


  render() {
    console.log("render invoked")
    console.log(this.state.data)
    const { data, time, date } = this.state;
    return (
      <div className="App">
        <div className="container">

          <div className="current-weather">
            <div className="informations">
              <h1 className="city">
                <span>{data.name}, </span>
                <span>{this.state.sys.country}</span>
              </h1>

              <h4 className="time">{time.hour + " : " + time.minute + " : " + time.second}</h4>

              <h4 className="date">{date.month + " " + date.day + " - " + date.year}</h4>

              <div className="weather-condition">
                <img className="weather-image" src={
                  data.weather ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : cloud1
                } alt="weather" />
                <span>
                  {
                    data.weather ? data.weather[0].description : ""
                  }
                </span>
              </div>
            </div>

            <div className="details">
              <div className="temperature-container">
                <div className="lowest">
                  <img className="arrow" src={downArrow} alt="arrow" />
                  <span>{Math.floor(this.state.main.temp_min)}&#176;</span>
                </div>

                <span className="temperature">{Math.floor(this.state.main.temp)} C&#176;
                </span>

                <div className="highest">
                  <span>{Math.floor(this.state.main.temp_max)}&#176;</span>
                  <img className="arrow" src={upArrow} alt="arrow" />
                </div>
              </div>

              <div className="weather-parameters">
                <div className="wind">
                  <img src={windIcon} alt="icon" />
                  <span>{this.state.wind.speed} m/s</span>
                </div>

                <div className="humidity">
                  <img src={humidityIcon} alt="icon" />
                  <span>{this.state.main.humidity} %</span>
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
