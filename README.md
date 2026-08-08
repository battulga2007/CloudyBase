# Live Demo

🌐 https://battulga2007.github.io/CloudyBase/

---

# ☁️ CloudyBase

**Beautiful forecasts, built for simplicity.**

CloudyBase is a full-stack weather application focused on making weather information simple to search, easy to understand, and pleasant to look at.

The project started as a static frontend prototype with hardcoded weather data. It evolved into a fully deployed application with location search, a FastAPI backend, real weather data from Open-Meteo, dynamic forecast rendering, and responsive design.

---

## ✨ Features

### 🔎 Location Search

Search for a city and select from dynamically generated location results. The selected location's coordinates are then used to request its weather data.

### 🌤️ Current Weather

The dashboard dynamically displays:

- Current temperature
- Apparent / "feels like" temperature
- Weather condition and icon
- Today's high and low
- Humidity
- Wind speed
- Atmospheric pressure
- Visibility
- UV index

### 📅 Five-Day Forecast

The forecast is generated from live API data and includes:

- Day of the week
- Weather icon
- Minimum and maximum temperatures
- Relative temperature-range visualization
- Current-temperature indicator for today

### 📱 Responsive Design

The interface is designed for both desktop and mobile screens, with the forecast visualization adapting to the available space.

The dashboard also remains hidden until a successful weather search, so users aren't greeted by random hardcoded weather data.

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│         GitHub Pages         │
│                              │
│   HTML / CSS / JavaScript    │
└──────────────┬───────────────┘
               │
               │ HTTPS
               ▼
┌──────────────────────────────┐
│          FastAPI             │
│           Render             │
│                              │
│   Location Search Endpoint   │
│   Weather Forecast Endpoint  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Open-Meteo           │
│                              │
│   Geocoding + Weather Data   │
└──────────────────────────────┘
```

The frontend handles user interaction and presentation, while the FastAPI backend handles communication with the external weather services.

---

## 🧠 How It Works

The basic request flow is:

```text
User searches for a city
        ↓
Frontend requests location results
        ↓
FastAPI → Open-Meteo Geocoding
        ↓
User selects a location
        ↓
Frontend sends coordinates
        ↓
FastAPI → Open-Meteo Forecast
        ↓
Weather data returned
        ↓
Dashboard rendered dynamically
```

The frontend and backend are deployed separately:

- **Frontend:** GitHub Pages
- **Backend:** Render
- **Weather & geocoding:** Open-Meteo

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- Vanilla JavaScript
- CSS Grid / Flexbox

**Backend**
- Python
- FastAPI
- HTTPX
- Uvicorn

**APIs**
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

---

## 🎯 Why I Built This

CloudyBase started as a simple frontend exercise. The initial version was almost entirely hardcoded.

The project became more interesting when the goal changed from:

> **"Can I make a weather dashboard?"**

to:

> **"Can I make the entire thing actually work?"**

That meant connecting a frontend to a backend, integrating external APIs, handling asynchronous requests, dynamically generating UI components, dealing with CORS, and eventually deploying the application.

The result is a small but complete full-stack project that demonstrates how these pieces fit together.

---

## 🚀 Current Status

**CloudyBase v1.0.0 — First Full-Stack Release**

- ✅ Location search
- ✅ Geocoding
- ✅ FastAPI backend
- ✅ Real weather data
- ✅ Dynamic weather dashboard
- ✅ Weather icons and descriptions
- ✅ Five-day forecast
- ✅ Temperature-range visualization
- ✅ Responsive desktop and mobile layouts
- ✅ GitHub Pages deployment
- ✅ Render backend deployment

---

## 📜 License

CloudyBase is currently released under the **[choose your license here]** license.
