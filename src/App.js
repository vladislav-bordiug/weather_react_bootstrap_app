import { useState, useEffect } from 'react';
import "lux/bootstrap.css";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import './App.css';

const PLACES = [
  { name: "Monaco", zip: "98000" },
  { name: "Palo Alto", zip: "94301" },
  { name: "Saint Petersburg", zip: "194064" },
  { name: "Honolulu", zip: "96803" }
]

function App() {
  const [place, setPlace] = useState({
    activePlace: 0,
  });
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Weather App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="otstup">
        <Row>
          <Col md={4} sm={4}>
            <h3>Select a city</h3>
            <Nav
              variant="pills"
              activeKey = {place.activePlace}
              onSelect = {index => {
                setPlace({ activePlace: index });
              }}
              className="flex-column"
            >
              {PLACES.map((place, index) => (
                <Nav.Link key = {index} eventKey={index}>{place.name}</Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={8} sm={8}>
            <WeatherDisplay key = {place.activePlace} zip = {PLACES[place.activePlace].zip}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function WeatherDisplay({zip}){
  const [weather, setWeather] = useState({
    weatherData: 0,
  });
  useEffect(() => {
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      setWeather({weatherData: json});
    });
  }, [])
  if(!weather.weatherData) return <div>Loading...</div>;
  const weathercity = weather.weatherData.weather[0];
  const iconUrl = "http://openweathermap.org/img/w/" + weathercity.icon + ".png";
  return (
    <div>
      <h1>
        {weathercity.main} in {weather.weatherData.name}
        <img src = {iconUrl} alt = {weather.weatherData.description}/>
      </h1>
      <p>Current: {((weather.weatherData.main.temp-32)*5/9).toFixed(1)}°C</p>
      <p>High: {((weather.weatherData.main.temp_max-32)*5/9).toFixed(1)}°C</p>
      <p>Low: {((weather.weatherData.main.temp_min-32)*5/9).toFixed(1)}°C</p>
      <p>Wind speed: {(weather.weatherData.wind.speed/2.237).toFixed(2)} m/s</p>
    </div>
  );
}

export default App;