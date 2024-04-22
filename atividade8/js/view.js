class WeatherView {
    constructor() {
        this.cityElement = document.querySelector("#city");
        this.tempElement = document.querySelector("#temperature span");
        this.descElement = document.querySelector("#description");
        this.weatherIconElement = document.querySelector("#weather-icon");
        this.countryElement = document.querySelector("#country");
        this.umidityElement = document.querySelector("#umidity span");
        this.windElement = document.querySelector("#wind span");
        this.weatherContainer = document.querySelector("#weather-data");
        this.errorMessageContainer = document.querySelector("#error-message");
        this.loader = document.querySelector("#loader");
    }

    toggleLoader(showLoader) {
        if (showLoader) {
            this.loader.classList.remove("hide");
        } else {
            this.loader.classList.add("hide");
        }
    }

    showErrorMessage() {
        this.errorMessageContainer.classList.remove("hide");
    }

    hideInformation() {
        this.errorMessageContainer.classList.add("hide");
        this.weatherContainer.classList.add("hide");
    }

    showWeatherData(weatherData) {
        if (!weatherData.city || !weatherData.temperature || !weatherData.description || !weatherData.icon || !weatherData.country || !weatherData.humidity || !weatherData.windSpeed) {
            this.hideInformation();
            return;
        }

        this.hideInformation();
        this.cityElement.innerText = weatherData.city;
        this.tempElement.innerText = parseInt(weatherData.temperature);
        this.descElement.innerText = weatherData.description;
        this.weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${weatherData.icon}.png`);
        this.umidityElement.innerText = `${weatherData.humidity}%`;
        this.windElement.innerText = `${weatherData.windSpeed}km/h`;
        this.weatherContainer.classList.remove("hide");
    }
}