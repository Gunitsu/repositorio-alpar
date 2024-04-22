class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiWeatherURL = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeatherData(city) {
    const apiURL = `${this.apiWeatherURL}?q=${city}&units=metric&appid=${this.apiKey}&lang=pt_br`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
  }
}