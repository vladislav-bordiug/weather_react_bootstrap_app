import { Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { days } from '../../../data/data.js';
import './styles.css';

function ForecastDisplay(){
  const forecastData = useSelector((state) => state.weather.forecastData)
  if (!forecastData) return <div className = "d-flex flex-row"><p className="loading">Loading...</p><div className="spinner"></div></div>;
  const errors = forecastData?.list.some((place) =>
    !place?.weather?.[0]?.main ||
    place?.dt === undefined ||
    place?.temp.day === undefined ||
    place?.feels_like.day === undefined ||
    place?.temp.max === undefined ||
    place?.temp.min === undefined ||
    place?.speed === undefined
  );
  if (errors)
    return <div className = "d-flex flex-row" data-testid="error"><p className="loading">Error in response</p></div>;
  return (
    <Row data-testid="forecast">
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