import React, { useEffect, useState } from "react";
import Daily from "./Daily";
import Hourly from "./Hourly";
import ".././scss/Forecast.scss";

const Forcast = ({ lat, lon, details }) => {
  const [forecast, setForecast] = useState("");
  console.log(lat, lon);

  console.log(forecast);
  console.log(details);
  const error = {
    cod: "404",
    message: "city not found",
  };

  useEffect(() => {
    const getForecast = async () => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=eb4a9ef0a88caa72df8d36773173ddb3&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setForecast(data);
      // console.log(url);
    };
    getForecast();
  }, [lat, lon]);
  return (
    <div className="forecast">
      {details.message !== error.message
        ? forecast && (
            <div>
              <div className="main">
                <div className="city_name-div">
                  <h1 className="city_name">
                    {details.name}
                    <img
                      className="main_logo"
                      src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`}
                      alt={details.weather[0].description}
                    />
                  </h1>
                </div>

                <span className="temp">
                  {details.main.temp} <sup>°</sup>C
                </span>
                <p className="description">{details.weather[0].description}</p>
                <p>
                  {forecast.daily[0].temp.min}°C / {forecast.daily[0].temp.max}
                  °C
                </p>

                {/* <p>{weather.weather[0].description}</p> */}
              </div>

              <Hourly data={forecast.hourly} />
              <Daily data={forecast.daily} />

              <div className="day_details">
                <div className="others">
                  <div>
                    <span>Pressure</span>
                    <span>precipitation</span>
                  </div>
                  <div></div>
                </div>
                -
                <div className="humidity">
                  <h1>Comfort Level</h1>
                  <div>
                    <div>
                      <span>Humidity</span>
                      <span id="humidity_value">
                        {forecast.hourly[0].humidity}%
                      </span>
                    </div>
                    <div>
                      <span>feels like: 25</span>
                      <span>UV: 3</span>
                    </div>
                  </div>
                </div>
                <div className="wind">
                  <h1>Wind</h1>
                  <div>
                    <div>
                      {/* <img src="https://www.pinclipart.com/picdir/big/73-735391_wind-turbine-blades-png-jpg-free-download-wind.png" alt="" /> */}
                      <img
                        className="windmill"
                        src="https://media4.giphy.com/media/xVFpxZnIhW4CuQTJ1M/giphy.gif?cid=790b7611d180eee79af402a5fcfcb4b5219382d32ddba23b&rid=giphy.gif&ct=s"
                        alt=""
                      />
                      {/* <img className='windmill' src="https://media1.giphy.com/media/SQSxROvkJ74zEtzB0Q/giphy.gif?cid=790b7611e25126e47859c545227353d0f6f7c2c8fdc3e835&rid=giphy.gif&ct=s"></img> */}
                    </div>
                    <div>
                      <span>Direction: </span>
                      <span>Speed: </span>
                    </div>
                  </div>
                </div>
                <div className="sun"></div>
              </div>
            </div>
          )
        : "Opps! city not found"}

      {/* {console.log(new Date(1626944400 * 1000).toLocaleTimeString())} */}
    </div>
  );
};

export default Forcast;
