import React from 'react'

const Hourly = ({ data}) => {
    data.splice(24,data.length-24)
    const secondsToTime = (seconds)=> {
        var time= new Date(seconds * 1000).toLocaleTimeString()
        return time
    }
    return (
        <div className='Hourly'>
            {/* {console.log(data)} */}
           
            <div className="map">
                {  data.map( (elem,ind) => (
                     <div className="hour" key={ind}>
                        <span>{secondsToTime(elem.dt)}</span>
                        <img className='icon' src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt={elem.weather[0].description}/>
                        <p className="temperature">{Math.round(elem.temp)} <sup>°</sup>C</p>
                     </div>
                   
                ))}
            </div>
        </div>
    )
}

export default Hourly
