from fastapi import FastAPI
import httpx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# To allow multiple origins, you can specify them in the allow_origins list.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://battulga2007.github.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# To check if API is running
@app.get("/")
def root():
    return {"message": "Weather Dashboard API is up and running"}



@app.get("/locations/search")
async def search_locations(q: str):
    # Search Open-Meteo's geocoding service for locations matching
    # the text entered by the user.
    geocoding_url = "https://geocoding-api.open-meteo.com/v1/search"

    # Assigning the query parameters to a dictionary
    geocoding_params = {
        "name": q,
        "count": 5,
        "language": "en",
        "format": "json"
    }

    # Fetching the data from the API
    async with httpx.AsyncClient() as client:
        response = await client.get(
            geocoding_url,
            params=geocoding_params
        )

    # The response in JSON format
    data = response.json()

    # If the geocoding service found nothing, return an empty list.
    if "results" not in data:
        return {"locations": []}

    # Only return the information our application actually needs.
    locations = []

    # Looping to extract results
    for location in data["results"]:
        locations.append({
            "id": location["id"],
            "name": location["name"],
            "country": location.get("country"),
            "latitude": location["latitude"],
            "longitude": location["longitude"]
        })

    # Returning the list of locations
    return {"locations": locations}


@app.get("/weather")
async def get_weather(
    latitude: float,
    longitude: float
):
    # Open-Meteo forecast endpoint.
    weather_url = "https://api.open-meteo.com/v1/forecast"

    # Parameters required by the forecast API.
    weather_params = {
    "latitude": latitude,
    "longitude": longitude,

    "current": (
        "temperature_2m,"
        "apparent_temperature,"
        "relative_humidity_2m,"
        "wind_speed_10m,"
        "surface_pressure,"
        "visibility,"
        "uv_index,"
        "weather_code"
    ),

    "daily": (
        "temperature_2m_max,"
        "temperature_2m_min,"
        "weather_code"
    ),

    "forecast_days": 7,
    "timezone": "auto"
}

    # Send the coordinates to Open-Meteo and retrieve the forecast.
    async with httpx.AsyncClient() as client:
        response = await client.get(
            weather_url,
            params=weather_params
        )

    # Convert the API response into JSON.
    data = response.json()

    # Return the weather data to the frontend.
    return data