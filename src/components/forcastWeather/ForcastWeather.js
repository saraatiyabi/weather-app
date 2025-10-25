import React from 'react'
import { Accordion } from 'react-bootstrap'
import './ForcastWeather.css'
export default function ForcastWeather({ data }) {
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let currentDay = new Date().getDay();
    console.log(currentDay)
    let forcastDays = weekDays.slice(currentDay, weekDays.length).concat(weekDays.slice(0, currentDay))
    console.log(forcastDays)
    return (
        <Accordion>
            {
                data.list.splice(0, 7).map((item, index) => (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header className='accordion-header'>
                            <div className='left'>
                                <img src={`icons/${item.weather[0].icon}.png`} className='icon' />
                                <span>{forcastDays[index]}</span>
                            </div>
                            <div className='right'>
                                <span>{item.weather[0].description}</span>
                                <span>{Math.floor(item.main.temp_min)}°C</span> /
                                <span>{Math.floor(item.main.temp_max)}°C</span>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className='row'>
                                <div className='col-6 item'>
                                    <span>Feels Like</span>
                                    <span>{Math.floor(item.main.feels_like)}°C</span>
                                </div>
                                <div className='col-6 item'>
                                    <span>Clouds</span>
                                    <span>{item.clouds.all}%</span>
                                </div>
                                <div className='col-6 item'>
                                    <span>Pressure</span>
                                    <span>{item.main.pressure} kPa</span>
                                </div>
                                <div className='col-6 item'>
                                    <span>Humidity</span>
                                    <span>{item.main.humidity}%</span>
                                </div>
                                <div className='col-6 item'>
                                    <span>Wind Speed</span>
                                    <span>{Math.floor(item.wind.speed)} m/s</span>
                                </div>
                                <div className='col-6 item'>
                                    <span>Sea Level</span>
                                    <span>{Math.floor(item.main.sea_level)}m</span>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    )
}
