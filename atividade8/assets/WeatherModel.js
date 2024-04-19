// WeatherModel.js

class WeatherModel {
    constructor() {
        this.apiKey = "5ce165099db98eb1a4172c9b8eea4597";
    }

    async getCurrentWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }

    async getWeatherForecast(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }

    async getWeatherByCoordinates(latitude, longitude) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }

    async getForecastByCoordinates(latitude, longitude) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }
}