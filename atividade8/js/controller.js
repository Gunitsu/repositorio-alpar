class WeatherController {
  constructor(service, view) {
    this.weatherService = service;
    this.weatherView = view;
    this.searchBtn = document.querySelector("#search");
    this.cityInput = document.querySelector("#city-input");
    this.suggestionButtons = document.querySelectorAll("#suggestions button");
    this.bindEvents();
  }

  bindEvents() {
    this.searchBtn.addEventListener("click", () => {
      this.hideSuggestions(); // Oculta as sugestões ao clicar em "Pesquisar"
      this.handleSearch();
    });
    this.cityInput.addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        this.hideSuggestions(); // Oculta as sugestões ao pressionar Enter
        this.handleSearch();
      }
    });
    this.suggestionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");
        this.hideSuggestions(); // Oculta as sugestões ao clicar em uma sugestão
        this.showWeatherData(city);
      });
    });
  }

  async handleSearch() {
    const city = this.cityInput.value.trim();
    if (city !== "") {
      this.weatherView.hideInformation(); // Oculta as informações antes de iniciar uma nova pesquisa
      this.weatherView.toggleLoader(true); // Exibe o loader
      await this.showWeatherData(city); // Realiza a pesquisa
      this.weatherView.toggleLoader(false); // Oculta o loader após a pesquisa
    }
  }

  hideSuggestions() {
    this.suggestionButtons.forEach((btn) => {
      btn.style.display = "none"; // Oculta cada botão de sugestão
    });
  }

  async showWeatherData(city) {
    this.weatherView.toggleLoader();
    const data = await this.weatherService.getWeatherData(city);
    if (data.cod === "404") {
      this.weatherView.showErrorMessage();
      this.weatherView.toggleLoader();
      return;
    }
    const weatherData = new WeatherData(
      data.name,
      parseInt(data.main.temp),
      data.weather[0].description,
      data.weather[0].icon,
      data.sys.country,
      data.main.humidity,
      data.wind.speed
    );
    this.weatherView.showWeatherData(weatherData);
    this.weatherView.toggleLoader();
  }
}

// Configuração
const apiKey = "5ce165099db98eb1a4172c9b8eea4597";
const weatherService = new WeatherService(apiKey);
const weatherView = new WeatherView();
const weatherController = new WeatherController(weatherService, weatherView);