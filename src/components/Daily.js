import React from 'react'

const Daily = ({ data }) => {
    const secondsToTime = (seconds)=> {
        var date= new Date(seconds * 1000).toLocaleString().substr(0,9);
        return date
    }

    return (
        <div className='daily'>
             {/* {console.log(data)}  */}

             <div className="map2">
             {  data.map( (elem,ind) => (
                     <div className="day" key={ind}>
                        <span>{secondsToTime(elem.dt)}</span>
                        <img className='icon' src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt={elem.weather[0].description}/>
                        <p className="temperature">{Math.round(elem.temp.min)}<sup>°</sup> / {Math.round(elem.temp.max)}<sup>°</sup></p>
                     </div>
                   
                ))}
            </div>       
        </div>
    )
}

export default Daily
