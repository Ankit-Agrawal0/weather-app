import React, { useState , useEffect} from 'react'
import Forcast from './Forcast';
import Loading from './Loading';

const Weather = () => {
    const [weather, setWeather] = useState("");
    const [input, setInput] = useState('')
    const [city, setCity] = useState('australia')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState("")
    const [video, setVideo] = useState('')
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb4a9ef0a88caa72df8d36773173ddb3&units=metric
    `;
    const getData = async() => {
         const response= await fetch(url);
         const data = await response.json();
         setWeather(data);
        
    }
    const error =  {
        "cod": "404",
        "message": "city not found"
        };

    console.log(weather);
    const geolocation = ()=>{
        if (weather !== "" && weather.message !== error.message ) {
            setLat(weather.coord.lat)
            setLon(weather.coord.lon)
            // console.log(`latitude- ${lat}`);
            // console.log(`longitude- ${lon}`);
        } 
    }
 
    const background = (condition)=>{
        if (weather !== "" && weather.message !== error.message ) {
         
           switch (weather.weather[0].main) {
               case 'Rain':
                   setVideo("https://player.vimeo.com/external/226685088.sd.mp4?s=bc60c4f177691974edc76b96774a116708b639e7&profile_id=164&oauth2_token_id=57447761")
       
                   break;

               case 'Clear':
                    setVideo('https://cdn.videvo.net/videvo_files/video/free/2020-07/small_watermarked/06_1596083776_preview.webm')
                
                   break;

               case 'Thunderstorm':
        setVideo('https://player.vimeo.com/external/347938094.sd.mp4?s=ea7d5d6e1946dec8021ece3476e94464645076ef&profile_id=139&oauth2_token_id=57447761')
                  break;

               case 'Clouds':
                setVideo("https://player.vimeo.com/external/209333087.sd.mp4?s=65842decb1c966bf4751fc9598ea71a81e4d9d31&profile_id=164&oauth2_token_id=57447761")
                  break;       
             
               default:
                setVideo("https://player.vimeo.com/external/271510997.sd.mp4?s=4cf911b949066ba984a9535427043fc5c8fbef22&profile_id=164&oauth2_token_id=57447761")
                   break;
           }

        // if (condition) {
            
        // }
        }
    }
     function bekar() {
         return (
            <video autoPlay loop id="myVideo">
                    <source src={video} type="video/mp4"/>
                    <p>not supported video</p>
                </video>
         )
     }
   console.log(video);
    useEffect(() => {
        getData();
        geolocation()
    },[city])
    
    useEffect(() => {
        geolocation()
        background()
    })
    useEffect(() => {
        background()
    },[video])
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
        setCity(input)

    }
    return (
        <div> 
             <div className='header'>
                 <h1 className='logo'>WEATHERPIEA</h1>
{ video === ''  || <video autoPlay loop id="myVideo">
                    <source src={video} type="video/mp4"/>
                    <p>not supported video</p>
                </video>}
                 
                {/* #myVideo {
                position: fixed;
                right: 0;
                bottom: 0;
                min-width: 100%;
                min-height: 100%;
                z-index: -1;
              } */}

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
