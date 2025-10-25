import React from 'react'
import './CurrentWeather.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompressIcon from '@mui/icons-material/Compress';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function CurrentWeather({ data }) {
    return (
        <div className='weather'>
            <div className='top'>
                <div className='top-left'>
                    <div className='location'>
                        <LocationOnIcon />
                        <h2 className='city'>{data.city}</h2>
                    </div>

                    <div className='weather-condition'>
                        <AutoAwesomeIcon />
                        <span className='status'>{data.weather[0].main}</span>
                    </div>

                </div>
                <div className='top-right'>
                    <img src={`icons/${data.weather[0].icon}.png`} />
                </div>
            </div>

            <div className='tempreture-section'>
                <ThermostatIcon className='temp-icon' />
                <p className='tempreture'>{Math.floor(data.main.temp)}°C</p>
            </div>
            <div className='details-section'>
                <div className='parameter-row details'>
                    <span>Details</span>
                </div>
                <div className='parameter-row'>
                    <div>
                        <ThermostatIcon />
                        <span>Feels like</span>
                    </div>
                    <span>{Math.floor(data.main.feels_like)}°C</span>
                </div>
                <div className='parameter-row'>
                    <div>
                        <AirIcon />
                        <span>Wind</span>
                    </div>
                    <span>{Math.floor(data.wind.speed)} m/s</span>
                </div>
                <div className='parameter-row'>
                    <div>
                        <WaterDropIcon />
                        <span>Humidity</span>
                    </div>
                    <span>{data.main.humidity}%</span>
                </div>
                <div className='parameter-row'>
                    <div>
                        <CompressIcon />
                        <span>Pressure</span>
                    </div>
                    <span>{data.main.pressure} kPa</span>
                </div>
                <div className='parameter-row'>
                    <div>
                        {data.weather[0].main === "Clouds" ? <CloudIcon /> : <WbSunnyIcon />}
                        <span>Description</span>
                    </div>
                    <span>{data.weather[0].description}</span>
                </div>
            </div>
        </div>
    )
}
