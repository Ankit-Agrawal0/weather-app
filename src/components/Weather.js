import React, { useState , useEffect} from 'react'
import Forcast from './Forcast';
import Loading from './Loading';

const Weather = () => {
    const [weather, setWeather] = useState("");
    const [input, setInput] = useState('')
    const [city, setCity] = useState('ranchi')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState("")
    const [disabled, setDisabled] = useState(true)
   
    const error =  {
        "cod": "404",
        "message": "city not found"
        };

    // console.log(weather);
  
 
  
    useEffect(() => {
        const getData = async() => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb4a9ef0a88caa72df8d36773173ddb3&units=metric
            `;
            const response= await fetch(url);
            const data = await response.json();
            setWeather(data);
           
       }
       const geolocation = ()=>{
        if (weather !== "" && weather.message !== error.message ) {
            setLat(weather.coord.lat)
            setLon(weather.coord.lon)
            // console.log(`latitude- ${lat}`);
            // console.log(`longitude- ${lon}`);
        } 
    }
        getData();
        geolocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[city])
    useEffect(() => {
        input !== '' ? setDisabled(false) : setDisabled(true)
    }, [input])
    useEffect(() => {
        const geolocation = ()=>{
            if (weather !== "" && weather.message !== error.message ) {
                setLat(weather.coord.lat)
                setLon(weather.coord.lon)
                // console.log(`latitude- ${lat}`);
                // console.log(`longitude- ${lon}`);
            } 
        }
        geolocation()
       

    })
  
    const handleCityName = (e) =>{

        if (e.target.value !== "") {
            if (e.target.value.includes(' ')) {              
                e.target.value.replace(" ","%20")
            }
            setInput(e.target.value)
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        
      input === '' ||  setCity(input)

    }
    return (
        <div> 
             <div className='header'>
                 <h1 className='logo'>WEATHERPIEA</h1>
                 {/* <form onSubmit={handleSubmit} className="input-section">
                    <input 
                        type="text" 
                        name="search" 
                        className='input'
                        onChange={handleCityName}
                    />
                    <button type="submit">🔎</button>
                 </form> */}
                 <form onSubmit={handleSubmit} className="input-group mb-3 form">
                    <input 
                        type="search" 
                        className="form-control" 
                        placeholder="Search city" 
                        aria-label="Search city" 
                        aria-describedby="button-addon2"
                        onChange={handleCityName}></input>
                    <button 
                        className="btn btn-outline-secondary" 
                        type="submit" 
                        disabled={disabled}
                        id="button-addon2">🔎</button>
                </form>
             </div>
             { weather === '' ? (<Loading />) : weather.message !== error.message ? (
                  <div className='main'>
                      <div className='city_name-div'>
                        <h1 className='city_name'>{weather.name}
                        <img className='main_logo' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/></h1>
                      </div>
                     
                      <span className='temp'>{weather.main.temp} <sup>°</sup>C</span>
                      <p className='description'>{weather.weather[0].main}</p>
                      <p>{weather.main.temp_min}°C / {weather.main.temp_max}°C</p>
                     
                      {/* <p>{weather.weather[0].description}</p> */}
                      
                  </div> 
                  ) : 'Opps! city not found' }
             { lat !== "" && weather.message !== error.message && <Forcast lat={lat} lon={lon} />}
        </div>
    )
}

export default Weather
