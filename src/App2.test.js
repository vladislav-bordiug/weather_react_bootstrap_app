import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WeatherDisplay from './features/weather/components/WeatherDisplay';
import WeatherSection from './features/weather/components/WeatherSection';
import ForecastDisplay from './features/weather/components/ForecastDisplay';
import store from './app/store';
import weatherReducer from './features/weather/weatherSlice'

describe('WeatherSection Component', () => {
  test('renders all data after loading', async () => {
    render(
      <Provider store={store}>
        <WeatherSection />
      </Provider>
    );
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(2000);

    const weather = await screen.findAllByTestId('weather');
    
    expect(weather).toHaveLength(1);

    const forecast = await screen.findAllByTestId('forecast');
    
    expect(forecast).toHaveLength(1);

    const error = screen.queryByTestId('error');
    
    expect(error).toBeNull();
  });

  test('renders weather data when response is incorrect', async () => {
    const mockStore = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          activeCity: 0,
          lon: null,
          lat: null,
          weatherData: {
            weather: [{ main: 'Clear', icon: '01d', description: 'clear sky' }],
            main: { temp: 25.5, feels_like: 26.7, temp_max: 27.0, temp_min: 22.1 },
          },
          forecastData: null,
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <WeatherDisplay />
      </Provider>
    );

    const error = await screen.findAllByTestId('error');
    
    expect(error).toHaveLength(1);
  });

  test('renders loading when weather data is null', async () => {
    const mockStore = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          activeCity: 0,
          lon: null,
          lat: null,
          weatherData: null,
          forecastData: null,
        },
      },
    });

    const { container } = render(
      <Provider store={mockStore}>
        <WeatherDisplay />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });

  test('renders forecast data when data is incorrect', async () => {
    const mockStore = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          activeCity: 0,
          lon: null,
          lat: null,
          weatherData: {
            weather: [{ main: 'Clear', icon: '01d', description: 'clear sky' }],
            main: { temp: 25.5, feels_like: 26.7, temp_max: 27.0, temp_min: 22.1 },
          },
          forecastData: {
            list: [{weather: [{ main: 'Clear', icon: '01d', description: 'clear sky' }],
            main: { temp: 25.5, feels_like: 26.7, temp_max: 27.0, temp_min: 22.1 }}],
          },
        },
      },
    });

    render(
      <Provider store={mockStore}>
        <ForecastDisplay />
      </Provider>
    );

    const error = await screen.findAllByTestId('error');
    
    expect(error).toHaveLength(1);
  });

  test('renders loading when forecast data is null', async () => {
    const mockStore = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState: {
        weather: {
          activeCity: 0,
          lon: null,
          lat: null,
          weatherData: null,
          forecastData: null,
        },
      },
    });

    const { container } = render(
      <Provider store={mockStore}>
        <ForecastDisplay />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
});