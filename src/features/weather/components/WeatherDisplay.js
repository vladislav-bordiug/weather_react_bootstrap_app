import { useSelector, useStore } from 'react-redux';
import { PLACES } from '../../../data/data.js';
import './styles.css';

function WeatherDisplay(){
    const weatherData = useSelector((state) => state.weather.weatherData)
    const activeCity = useStore().getState().weather.activeCity;
    if(!weatherData) return <div className = "d-flex flex-row"><p className="loading">Loading...</p><div className="spinner"></div></div>;
    if (
      !weatherData?.weather?.[0]?.main ||
      !weatherData?.weather?.[0]?.description ||
      !weatherData?.weather?.[0]?.icon ||
      weatherData?.main?.temp === undefined ||
      weatherData?.main?.feels_like === undefined ||
      weatherData?.main?.temp_max === undefined ||
      weatherData?.main?.temp_min === undefined ||
      weatherData?.wind?.speed === undefined
    )
      return <div className = "d-flex flex-row" data-testid="error"><p className="loading">Error in response</p></div>;
    const weathercity = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/wn/" + weathercity.icon + ".png";
    return (
      <div>
        <h1>
          {weathercity.main} in {PLACES[activeCity].name}
          <img src = {iconUrl} alt = {weathercity.description}/>
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