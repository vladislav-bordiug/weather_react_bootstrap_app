import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherSection from './features/weather/components/WeatherSection';
import WeatherDisplay from './features/weather/components/WeatherDisplay';
import ForecastDisplay from './features/weather/components/ForecastDisplay';
import { PLACES, days } from './data/data';
const { thunk } = require('redux-thunk')
import { fetchCity, fetchWeatherdata, fetchForecastdata, changeCity } from './features/weather/weatherSlice';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

describe('WeatherSection Component', () => {
  let store;

  const initialState = {
    weather: {
      activeCity: 0,
      lon: 0,
      lat: 0,
      weatherData: null,
      forecastData: null,
    },
  }

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders WeatherSection with city selector and weather display', async () => {
    render(
      <Provider store={store}>
        <WeatherSection />
      </Provider>
    );

    PLACES.forEach((place, index) => {
      expect(screen.getByText(place.name)).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /Forecasts for 6 days/i })).toBeInTheDocument();
    expect(screen.getByText('Select a city')).toBeInTheDocument();
  });

  test('changes city and dispatches actions to fetch new data', async () => {
    render(
      <Provider store={store}>
        <WeatherSection />
      </Provider>
    );

    expect(screen.getByText(PLACES[0].name)).toBeInTheDocument();

    fireEvent.click(screen.getByText(PLACES[1].name));

    let actions = store.getActions();
    expect(actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'weather/changeCity',
          payload: '1',
        }),
      ])
    );

    await waitFor(() => {
      const updatedActions = store.getActions();
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchCity/pending',
        })
      );
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchWeatherdata/pending',
        })
      );
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchForecastdata/pending',
        })
      );
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchCity/fulfilled',
        })
      );
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchWeatherdata/fulfilled',
        })
      );
      expect(updatedActions).toContainEqual(
        expect.objectContaining({
          type: 'weather/fetchForecastdata/fulfilled',
        })
      );
    });
  });
  
  test('renders weather data after loading', async () => {
    const mockWeatherData = {
      weather: [{ main: 'Clear', icon: '01d', description: 'clear sky' }],
      main: { temp: 25.5, feels_like: 26.7, temp_max: 27.0, temp_min: 22.1 },
      wind: { speed: 3.5 },
    };

    store = mockStore({
      weather: {
        activeCity: 0,
        weatherData: mockWeatherData,
        forecastData: null,
        lat: 0,
        lon: 0,
      },
    });

    render(
      <Provider store={store}>
        <WeatherDisplay />
      </Provider>
    );

    expect(screen.getByText(/Clear in/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(PLACES[0].name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Current: 25.5°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Feels like: 26.7°C/i)).toBeInTheDocument();
    expect(screen.getByText(/High: 27.0°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Low: 22.1°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind speed: 3.50 m\/s/i)).toBeInTheDocument();

    const iconSrc = `http://openweathermap.org/img/wn/${mockWeatherData.weather[0].icon}.png`;
    const icon = screen.getByAltText(mockWeatherData.weather[0].description);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', iconSrc);
  });

  test('renders loading state when data is not available', () => {
    store = mockStore({
      weather: {
        activeCity: 0,
        weatherData: null,
        forecastData: null,
        lat: null,
        lon: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ForecastDisplay />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

  test('renders forecast data after loading', async () => {
    const mockForecastData = {
      list: [{
        "dt": 1662116400,
        "temp": {
          "day": 291.45,
          "min": 286.15,
          "max": 291.45
        },
        "feels_like": {
          "day": 291.30
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.0
      },
      {
        "dt": 1662202800,
        "temp": {
          "day": 289.90,
          "min": 284.50,
          "max": 289.90
        },
        "feels_like": {
          "day": 289.70
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 2.8
      },
      {
        "dt": 1662289200,
        "temp": {
          "day": 288.20,
          "min": 283.00,
          "max": 288.20
        },
        "feels_like": {
          "day": 288.00
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.1
      },
      {
        "dt": 1662375600,
        "temp": {
          "day": 290.00,
          "min": 284.80,
          "max": 290.00
        },
        "feels_like": {
          "day": 289.80
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.5
      },
      {
        "dt": 1662462000,
        "temp": {
          "day": 292.00,
          "min": 285.50,
          "max": 292.00
        },
        "feels_like": {
          "day": 291.80
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.2
      },
      {
        "dt": 1662548400,
        "temp": {
          "day": 290.50,
          "min": 284.00,
          "max": 290.50
        },
        "feels_like": {
          "day": 290.30
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.4
      },
      {
        "dt": 1662634800,
        "temp": {
          "day": 293.20,
          "min": 286.80,
          "max": 293.20
        },
        "feels_like": {
          "day": 293.00
        },
        "weather": [
          {
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "speed": 3.1
      }            
      ],
    };

    store = mockStore({
      weather: {
        activeCity: 0,
        weatherData: null,
        forecastData: mockForecastData,
        lat: 0,
        lon: 0,
      },
    });

    render(
      <Provider store={store}>
        <ForecastDisplay />
      </Provider>
    );

    for (let i = 0; i < mockForecastData.length; i++) {
      expect(screen.getByText(new RegExp(mockForecastData[i].temp.day, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].temp.min, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].temp.max, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].feels_like.day, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].weather[0].main, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].weather[0].description, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockForecastData[i].speed, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(days[(new Date(mockForecastData[i].dt*1000)).getDay()], 'i'))).toBeInTheDocument();
      const iconSrc = `http://openweathermap.org/img/wn/${mockForecastData[i].weather[0].icon}.png`;
      const icon = screen.getByAltText(mockForecastData[i].weather[0].description);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', iconSrc);
    }
  });

  test('renders loading state when data is not available', () => {
    store = mockStore({
      weather: {
        activeCity: 0,
        weatherData: null,
        forecastData: null,
        lat: null,
        lon: null,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ForecastDisplay />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

});