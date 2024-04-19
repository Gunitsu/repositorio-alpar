// WeatherController.js

class WeatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindSearchCity(this.handleSearchCity);
        this.view.bindSearchLocation(this.handleSearchLocation);

        this.init();
    }

    async init() {
        try {
            const defaultCity = "Carapicuíba";
            const defaultWeather = await this.model.getCurrentWeather(defaultCity);
            const defaultForecast = await this.model.getWeatherForecast(defaultCity);
            this.view.displayWeather(defaultWeather);
            this.view.displayForecast(defaultForecast);
        } catch (error) {
            console.error("Error initializing application:", error);
        }
    }

    handleSearchCity = async (city) => {
        try {
            const weather = await this.model.getCurrentWeather(city);
            const forecast = await this.model.getWeatherForecast(city);
            this.view.displayWeather(weather);
            this.view.displayForecast(forecast);
        } catch (error) {
            console.error("Error searching for city:", error);
        }
    };

    handleSearchLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const weather = await this.model.getWeatherByCoordinates(latitude, longitude);
                const forecast = await this.model.getForecastByCoordinates(latitude, longitude);
                this.view.displayWeather(weather);
                this.view.displayForecast(forecast);
            } catch (error) {
                console.error("Error searching for location:", error);
            }
        });
    };
}

const model = new WeatherModel();
const view = new WeatherView();
const controller = new WeatherController(model, view);
