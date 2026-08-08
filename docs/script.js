const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("searchButton");
const locationResults = document.getElementById("location-results");
const API_URL = "https://cloudybase.onrender.com"

let selectedLocation = null;


// Search for locations whenever the user changes the input.
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();

    // Changing the text means the previous selection is no longer valid.
    selectedLocation = null;

    // Don't search until at least 3 characters are entered.
    if (query.length < 3) {
        locationResults.innerHTML = "";
        return;
    }

    searchLocations(query);
});


// Ask FastAPI for locations matching the user's query.
async function searchLocations(query) {
    const response = await fetch(
    `${API_URL}/locations/search?q=${encodeURIComponent(query)}`);

    const data = await response.json();

    displayLocations(data.locations);
}


// Display the locations returned by FastAPI.
function displayLocations(locations) {
    locationResults.innerHTML = "";

    if (locations.length === 0) {
        const result = document.createElement("div");

        result.textContent = "No locations found";
        result.classList.add("no-results");

        locationResults.appendChild(result);

        return;
    }

    locations.forEach(location => {
        const result = document.createElement("div");

        result.textContent = `${location.name}, ${location.country}`;

        result.addEventListener("click", () => {
            selectedLocation = location;

            searchInput.value =
                `${location.name}, ${location.country}`;

            locationResults.innerHTML = "";
        });

        locationResults.appendChild(result);
    });
}


// Handle the actual Search button.
searchButton.addEventListener("click", () => {
    if (!selectedLocation) {
        return;
    }

    getWeather(selectedLocation);
});

// To get forecast data of Search button
async function getWeather(location) {
    const response = await fetch(
    `${API_URL}/weather?latitude=${location.latitude}&longitude=${location.longitude}`);

    const data = await response.json();

    console.log("Weather data:", data);

    displayWeather(data, location);

}

function displayWeather(data, location) {

    // Enable Dashboard 
    document.getElementById("weather-dashboard").classList.remove("hidden");

    // City
    document.getElementById("cityName").textContent =
        location.name;

    // Date
    const dateString = data.current.time.split("T")[0];
    const date = new Date(dateString + "T12:00:00");

    document.getElementById("date").textContent =
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

    // Weather icon
    const weatherIcons = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",

        45: "🌫️",
        48: "🌫️",

        51: "🌦️",
        53: "🌦️",
        55: "🌧️",
        56: "🌧️",
        57: "🌧️",

        61: "🌧️",
        63: "🌧️",
        65: "🌧️",
        66: "🌧️",
        67: "🌧️",

        71: "🌨️",
        73: "🌨️",
        75: "❄️",
        77: "❄️",

        80: "🌦️",
        81: "🌦️",
        82: "🌧️",
        85: "🌨️",
        86: "❄️",

        95: "⛈️",
        96: "⛈️",
        99: "⛈️"
    };

    const weatherCodeEmoji = data.current.weather_code;

    document.querySelector(".weather-icon").textContent =
        weatherIcons[weatherCodeEmoji] || "🌡️";

    //Weather
    const weatherDescriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Depositing Rime Fog",

    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",

    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",

    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",

    80: "Light Rain Showers",
    81: "Moderate Rain Showers",
    82: "Heavy Rain Showers",

    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Thunderstorm with Heavy Hail"
    };

    const weatherCode = data.current.weather_code;

    document.getElementById("condition").textContent =
        weatherDescriptions[weatherCode] || "Unknown";

    // Temperature
    document.getElementById("temperature").textContent =
        `${data.current.temperature_2m}°`;

    // Min and Max Temperature
    document.getElementById("high-low").textContent =
        `H: ${data.daily.temperature_2m_max[0]}°    L: ${data.daily.temperature_2m_min[0]}°`;

    // Feels Like
    document.getElementById("feelsLike").textContent =
        `${data.current.apparent_temperature}°`;

    // Humidity
    document.getElementById("humidity").textContent =
        `${data.current.relative_humidity_2m}%`;

    // Wind
    document.getElementById("wind").textContent =
        `${data.current.wind_speed_10m} km/h`;

    // Pressure
    document.getElementById("pressure").textContent =
        `${data.current.surface_pressure} hPa`;

    // Visibility
    document.getElementById("visibility").textContent =
        `${data.current.visibility / 1000} km`;

    // UV
    document.getElementById("uv").textContent =
        data.current.uv_index;

    // Forecast
    const forecastList = document.querySelector(".forecast-list");

    forecastList.innerHTML = "";

    // Find the overall temperature range across the 5 days
    const forecastMins = data.daily.temperature_2m_min.slice(0, 5);
    const forecastMaxs = data.daily.temperature_2m_max.slice(0, 5);

    const minTemperature = Math.min(...forecastMins);
    const maxTemperature = Math.max(...forecastMaxs);

    const temperatureRange =
        maxTemperature - minTemperature;


    // Create 5 forecast rows
    for (let i = 0; i < 5; i++) {

        const date = new Date(
            data.daily.time[i] + "T12:00:00"
        );

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const minTemp =
            data.daily.temperature_2m_min[i];

        const maxTemp =
            data.daily.temperature_2m_max[i];

        const weatherCode =
            data.daily.weather_code[i];

        const icon =
            weatherIcons[weatherCode] || "🌡️";


        // Position of this day's temperature range
        const leftPosition =
            ((minTemp - minTemperature) /
            temperatureRange) * 100;

        const width =
            ((maxTemp - minTemp) /
            temperatureRange) * 100;


        // Today's current-temperature dot
        let dotHTML = "";

        if (i === 0) {

            const currentTemperature =
                data.current.temperature_2m;

            const dotPosition =
                ((currentTemperature - minTemperature) /
                temperatureRange) * 100;

            dotHTML = `
                <div
                    class="current-temperature-dot"
                    style="left: ${dotPosition}%"
                ></div>
            `;
        }


    // Create the forecast row
    const forecastItem = document.createElement("div");

    forecastItem.classList.add("forecast-item");

    forecastItem.innerHTML = `
        <div class="forecast-day">

            <span class="forecast-icon">
                ${icon}
            </span>

            <span>
                ${i === 0 ? "Today" : dayName}
            </span>

        </div>

        <div class="temperature-track">

            <div
                class="temperature-range"
                style="
                    left: ${leftPosition}%;
                    width: ${width}%;
                "
            ></div>

            ${dotHTML}

        </div>

        <div class="forecast-temp">
            ${minTemp}° / ${maxTemp}°
        </div>
    `;


    forecastList.appendChild(forecastItem);
}
}