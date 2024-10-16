import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { weatherAPI } from './weatherAPI'

export const fetchCity = createAsyncThunk(
    'weather/fetchCity',
    async (zip, thunkAPI) => {
      const response = await weatherAPI.fetchCity(zip)
      return response
    },
)

export const fetchWeatherdata = createAsyncThunk(
    'weather/fetchWeatherdata',
    async ({lat, lon}, thunkAPI) => {
      const response = await weatherAPI.fetchWeatherdata(lat, lon)
      return response
    },
)

export const fetchForecastdata = createAsyncThunk(
    'weather/fetchForecastdata',
    async ({lat, lon}, thunkAPI) => {
      const response = await weatherAPI.fetchForecastdata(lat, lon)
      return response
    },
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    activeCity: 0,
    lon: null,
    lat: null,
    weatherData: null,
    forecastData: null,
  },
  reducers: {
    changeCity: (state, action) => {
        state.weatherData = null;
        state.forecastData = null;
        state.activeCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCity.pending, (state) => {
            state.lon = null;
            state.lat = null;
        })
        .addCase(fetchCity.fulfilled, (state, action) => {
            state.lon = action.payload.lon;
            state.lat = action.payload.lat;
        })
        .addCase(fetchWeatherdata.fulfilled, (state, action) => {
            state.weatherData = action.payload;
        })
        .addCase(fetchForecastdata.fulfilled, (state, action) => {
            state.forecastData = action.payload;
        })
  }
})

export const { changeCity } = weatherSlice.actions

export default weatherSlice.reducer