import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCity, fetchCity} from '../weatherSlice';
import { Nav, Row, Col } from "react-bootstrap";
import ForecastDisplay from './ForecastDisplay';
import WeatherDisplay from './WeatherDisplay';
import {PLACES} from '../../../data/data.js';

function WeatherSection(){
    console.log(PLACES);
    const activeCity = useSelector((state) => state.weather.activeCity)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCity(PLACES[activeCity].zip));
    }, [activeCity, dispatch])
    return (
        <>
            <Row>
                <Col md={4} sm={4}>
                    <h3>Select a city</h3>
                    <Nav
                    variant="pills"
                    activeKey = {activeCity}
                    onSelect = {index => {
                        dispatch(changeCity(index));
                    }}
                    className="flex-column"
                    >
                    {PLACES.map((place, index) => (
                        <Nav.Link key = {index} eventKey={index}>{place.name}</Nav.Link>
                    ))}
                    </Nav>
                </Col>
                <Col md={8} sm={8}>
                    <WeatherDisplay key = {activeCity}/>
                </Col>
            </Row>
            <h1>
                Forecasts for 6 days:
            </h1>
            <ForecastDisplay key = {activeCity}/>
        </>
    );
}

export default WeatherSection;