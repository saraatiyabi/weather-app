import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import Searchbar from './components/searchbar/Searchbar';
import { WEATHER_URL, WEATHER_API_KEY, FORCAST_URL } from './api';
import { useEffect, useState } from 'react';
import ForcastWeather from './components/forcastWeather/ForcastWeather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forcastWeather, setForcastWeather] = useState(null)
  const [img, setImg] = useState('bg')


  const searchChangeHandler = (searchData) => {
    let [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcastFetch = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        let currentWeatherResponse = await response[0].json();
        let forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...currentWeatherResponse })
        setForcastWeather({ city: searchData.label, ...forcastResponse })
        setImg(currentWeatherResponse.weather[0].main)
      }).catch(err => console.log(err))
  }



  return (
    <div className='main' style={{ backgroundImage: `url("/backgrounds/${img}.jpg")`, backdropFilter: "brightness(50%)" }}>
      <div className="weather-container">
        <Searchbar onSearchChange={searchChangeHandler} />
        <div className='content'>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forcastWeather && <ForcastWeather data={forcastWeather} />}
        </div>
      </div>
    </div>

  );
}

export default App;
