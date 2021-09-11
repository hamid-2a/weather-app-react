import React from "react";
import "./weatherCard.styles.css";

const WeatherCard = ({ cardClass, hour, day, image, description, temperature }) => {
    hour < 12 ? hour=hour+" AM" : hour=hour+" PM";

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(day);
    day = days[d.getDay()]

    return (
        <div className={cardClass}>
            {
                cardClass === "small-card" ? <p className="hour">{hour}</p> : <p className="day">{day}</p>
            }
            <img src={image} alt="icon" />
            <p className="description">{description}</p>
            <p className="temperature">{temperature}&#176;</p>
        </div>
    )
}

export default WeatherCard;