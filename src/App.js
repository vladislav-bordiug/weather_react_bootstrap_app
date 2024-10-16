import "lux/bootstrap.css";
import { Navbar, Container } from "react-bootstrap";
import './App.css';
import WeatherSection from './features/weather/components/WeatherSection';

function App() {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Weather App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="otstup">
        <WeatherSection />
      </Container>
    </div>
  );
}

export default App;