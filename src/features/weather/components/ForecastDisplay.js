import { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { fetchForecastdata } from '../weatherSlice';
import { days } from '../../../data/data.js';

function ForecastDisplay(){
  const lon = useSelector((state) => state.weather.lon)
  const lat = useSelector((state) => state.weather.lat)
  const forecastData = useSelector((state) => state.weather.forecastData)
  const dispatch = useDispatch()
  useEffect(() => {
    if (lat != null && lon != null){
      dispatch(fetchForecastdata({lat: lat, lon: lon}))
    }
  }, [lat, lon, dispatch])
  if (!forecastData) return <div>Loading...</div>;
  return (
    <Row>
      {forecastData.list.map((place, index) => (
        <Col md={2} sm={2} key = {index}>
            <h3>
              {days[(new Date(place.dt*1000)).getDay()]}
            </h3>
            <h4>
              {place.weather[0].main}
              <img src = {"http://openweathermap.org/img/wn/" + place.weather[0].icon + ".png"} alt = {place.weather[0].description}/>
            </h4>
            <p>Day: {place.temp.day.toFixed(1)}°C</p>
            <p>Feels like: {place.feels_like.day.toFixed(1)}°C</p>
            <p>High: {place.temp.max.toFixed(1)}°C</p>
            <p>Low: {place.temp.min.toFixed(1)}°C</p>
            <p>Wind speed: {place.speed} m/s</p>
        </Col>
        ))}
    </Row>
  );
}

export default ForecastDisplay;