import "./App.css";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Searchbar from "./components/searchbar/Searchbar";
import { WEATHER_URL, WEATHER_API_KEY } from "./api"; // Removed FORCAST_URL (unused)
import { useState } from "react"; // Only import what you use
import ForcastWeather from "./components/forcastWeather/ForcastWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setForcastWeather] = useState(null);
  const [img, setImg] = useState("bg"); // fallback image

  const searchChangeHandler = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forcastFetch = fetch(
      `${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async ([currentRes, forcastRes]) => {
        const currentWeatherResponse = await currentRes.json();
        const forcastResponse = await forcastRes.json();

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForcastWeather({ city: searchData.label, ...forcastResponse });

        // Safely get weather condition
        const condition =
          currentWeatherResponse.weather?.[0]?.main?.toLowerCase() || "bg";
        setImg(condition);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setImg("bg"); // fallback on error
      });
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url("/backgrounds/${img}.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="weather-container">
        <Searchbar onSearchChange={searchChangeHandler} />
        <div className="content">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forcastWeather && <ForcastWeather data={forcastWeather} />}
        </div>
      </div>
    </div>
  );
}

export default App;
