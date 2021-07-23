import React , { useEffect, useState } from 'react'
import Daily from './Daily'
import Hourly from './Hourly'
import ".././scss/Forecast.scss";

const Forcast = ({ lat, lon }) => {
    const [forecast, setForecast] = useState('')
    // console.log(lat,  lon);
   
//    console.log(forecast);
   
  
   useEffect(() => {
    const getForecast = async() => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=eb4a9ef0a88caa72df8d36773173ddb3&units=metric`
        const response= await fetch(url);
        const data = await response.json();
        setForecast(data)
        // console.log(url);
   }
       getForecast()
       
   }, [lat, lon])
    return (
        <div>
            {forecast &&
            <div>
               <Hourly details={forecast.hourly}/>
               <Daily details={forecast.daily}/>
            </div>
        }
     
         {/* {console.log(new Date(1626944400 * 1000).toLocaleTimeString())} */}
        </div>
    )
}

export default Forcast
