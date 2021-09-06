import React from "react";
import "./weatherCard.styles.css";

const WeatherCard = ({ cardClass, hour, image, temperature }) => {
    return (
        <div className={cardClass}>
            <p className="hour">{hour}</p>
            <img src={image} alt="icon" />
            <p className="temperature">{temperature}&#176;</p>
        </div>
    )
}

export default WeatherCard;