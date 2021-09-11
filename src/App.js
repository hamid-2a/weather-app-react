import React, { Component } from 'react';
import './App.css';

import cloud from "./assets/cloud.png";
import Loading from "./assets/loading.svg";
import upArrow from "./assets/up-arrow.png";
import downArrow from "./assets/down-arrow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import WeatherCard from './components/weather-card/weatherCard.component';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import i02d from "./assets/icons/i02d.png";
/*
import i01d from "./assets/icons/i01d.png";
import i02d from "./assets/icons/i02d.png";
import i02n from "./assets/icons/i02n.png";
import i03d from "./assets/icons/i03d.png";
import i03n from "./assets/icons/i03n.png";
import i04d from "./assets/icons/i04d.png";
import i04n from "./assets/icons/i04n.png";
import i09d from "./assets/icons/i09d.png";
import i09n from "./assets/icons/i09n.png";
import i10d from "./assets/icons/i10d.png";
import i10n from "./assets/icons/i10n.png";
import i11d from "./assets/icons/i11d.png";
import i11n from "./assets/icons/i11n.png";
import i13d from "./assets/icons/i13d.png";
import i13n from "./assets/icons/i13n.png";
import i50d from "./assets/icons/i50d.png";
import i50n from "./assets/icons/i50n.png";
*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      city: "",
      searchedInput: [],
      searchedCities: [
        "semnan",
        "tehran",
        "Yazd",
        "Isfahan"
      ],
      forecastData: [],
      forecastHours: [],
      forecastDays: [],
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

    console.log("getTime invoked")
    //this.getTime();

    console.log("getData invoked")
    this.getData();

    console.log("getForecastData invoked")
    this.getForecastData()
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

  getData = async (city = "tehran") => {
    const apiKey = "8a97c3b8e3b9989c1d854dd1092eb7c6";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    const result = await response.json();
    console.log("setState invoked");
    this.setState({
      city: city,
      data: result
    });
    console.log("setState done");
    console.log(result);
    // console.log(this.state.data);
    console.log("fetch done");
  }

  getForecastData = async (city = "tehran") => {
    const apiKey = "8a97c3b8e3b9989c1d854dd1092eb7c6";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}&units=metric`;
    const response = await fetch(forecastUrl);
    const result = await response.json();

    const forecastHours = [];
    for (let i = 1; i < 6; i++) {
      forecastHours.push(result.list[i])
    }

    const forecastDays = [];
    for (let j = 0; j <= result.list.length; j = j + 7) {
      forecastDays.push(result.list[j])
    }
    forecastDays.shift();

    this.setState({
      forecastData: result,
      forecastHours: forecastHours,
      forecastDays: forecastDays
    });
    console.log(this.state.forecastData)
    console.log(this.state.forecastHours)
    console.log(this.state.forecastDays)
  }


  render() {
    console.log("render invoked")
    const { data, forecastData, time, date } = this.state;
    if (!this.state.data.sys) {
      return (
        <img src={Loading} alt="loading" />
      )
    }
    return (
      <div className="App">
        <div className="container">

          <div className="current-weather">

            <div className="informations">
              <h1 className="city">
                <span>{data.name}, </span>
                <span>{data.sys.country}</span>
              </h1>

              <h4 className="time">{time.hour + " : " + time.minute + " : " + time.second}</h4>

              <h4 className="date">{date.month + " " + date.day + " - " + date.year}</h4>

              <div className="weather-condition">
                <img className="weather-image" src={i02d} alt="weather" />
                <span>
                  {
                    data.weather[0].description
                  }
                </span>
              </div>
            </div>

            <div className="details">
              <div className="temperature-container">
                <div className="lowest">
                  <img className="arrow" src={downArrow} alt="arrow" />
                  <span>{Math.floor(data.main.temp_min)}&#176;</span>
                </div>

                <span className="temperature">{Math.floor(data.main.temp)} C&#176;
                </span>

                <div className="highest">
                  <span>{Math.floor(data.main.temp_max)}&#176;</span>
                  <img className="arrow" src={upArrow} alt="arrow" />
                </div>
              </div>

              <div className="weather-parameters">
                <div className="wind">
                  <img src={windIcon} alt="icon" />
                  <span>{data.wind.speed} m/s</span>
                </div>

                <div className="humidity">
                  <img src={humidityIcon} alt="icon" />
                  <span>{data.main.humidity} %</span>
                </div>
              </div>
            </div>

            {
              !forecastData.list ? <img className="loading-img" src={Loading} alt="loading" /> :
                <div className="hour-forecast">
                  {
                    this.state.forecastHours.map(item => (
                      <WeatherCard
                        key={item.dt}
                        cardClass="small-card"
                        hour={parseInt(item.dt_txt.slice(11, 13))}
                        image={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        description={item.weather[0].description}
                        temperature={Math.floor(item.main.temp)}
                      />
                    ))
                  }
                </div>
            }
          </div>

          <div className="search">

            <div className="search-box">
              <input className="search-input" id="search" type="text" placeholder="Search City" />
              <button type="submit"
                onClick={() => {
                  this.getData(document.getElementById("search").value)
                  this.getForecastData(document.getElementById("search").value)
                }}>
                Search</button>
            </div>

            
          </div>

          <div className="forecast-weather">
            {
              this.state.forecastDays.map(item => (
                <WeatherCard
                  key={item.dt}
                  cardClass="big-card"
                  day={item.dt_txt}
                  image={i02d}
                  temperature={Math.floor(item.main.temp)} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
