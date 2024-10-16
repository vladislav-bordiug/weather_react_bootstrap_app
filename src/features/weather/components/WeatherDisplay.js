import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherdata } from '../weatherSlice';
import { PLACES } from '../../../data/data.js';

function WeatherDisplay(){
    const activeCity = useSelector((state) => state.weather.activeCity)
    const lon = useSelector((state) => state.weather.lon)
    const lat = useSelector((state) => state.weather.lat)
    const weatherData = useSelector((state) => state.weather.weatherData)
    const dispatch = useDispatch()
    useEffect(() => {
      if (lat != null && lon != null){
        dispatch(fetchWeatherdata({lat: lat, lon: lon}))
      }
    }, [lat, lon, dispatch])
    if(!weatherData) return <div>Loading...</div>;
    const weathercity = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/wn/" + weathercity.icon + ".png";
    return (
      <div>
        <h1>
          {weathercity.main} in {PLACES[activeCity].name}
          <img src = {iconUrl} alt = {weatherData.description}/>
        </h1>
        <p>Current: {weatherData.main.temp.toFixed(1)}°C</p>
        <p>Feels like: {weatherData.main.feels_like.toFixed(1)}°C</p>
        <p>High: {weatherData.main.temp_max.toFixed(1)}°C</p>
        <p>Low: {weatherData.main.temp_min.toFixed(1)}°C</p>
        <p>Wind speed: {weatherData.wind.speed.toFixed(2)} m/s</p>
      </div>
    );
}
  
export default WeatherDisplay;