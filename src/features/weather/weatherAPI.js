const API_KEY = 'b1b35bba8b434a28a0be2a3e1071ae5b'

export const weatherAPI = {
    fetchCity: async (zip) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`);
        const data = await response.json();
        return data;
    },
    fetchWeatherdata: async (lat, lon) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${String(lat)}&lon=${String(lon)}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        return data;
    },
    fetchForecastdata: async (lat, lon) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${String(lat)}&lon=${String(lon)}&cnt=6&appid=${API_KEY}&units=metric&units=metric`);
        const data = await response.json();
        return data;
    },
};