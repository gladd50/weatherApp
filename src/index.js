import './style.css'
import img from './sky.jpg'

const Api = (() => {
    const getLat = async(city) => {
        try{
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb2301e0853dbe0b0607897a4d309e64`)
            let data = await response.json()
            return data.coord
        }
        catch(err){
            alert('city does not exist!')
            throw new Error('city does not exist!')
        }
    }
    const getWeather = async(city) => {
        let {lat,lon} = await getLat(city)
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bb2301e0853dbe0b0607897a4d309e64`)
        let data = await response.json()
        console.log(data)
        let weatherDesc = {
            'city': data.name,
            'temp': (data.main.temp - 273.15).toFixed(1),
            'iconUrl': `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            'weather': data.weather[0].main,
            'feelsLike': data.main.feels_like,
            'humidity': data.main.humidity,
            'pressure': data.main.pressure
        }
        console.log(weatherDesc)
        return weatherDesc
    }
    return {getWeather}
})()

const screenControll = (() => {
    const refreshPage = async(event) =>{
        event.preventDefault()
        let DOM = {
            cityName: document.getElementById('city-name'),
            temp: document.getElementById('temp'),
            icon: document.getElementById('weather-pict'),
            desc: document.getElementById('desc'),
            feels: document.getElementById('feels'),
            humidity: document.getElementById('humidity'),
            pressure: document.getElementById('Pressure'),
        }
        console.log(DOM)
        let inputCity = document.getElementById('city-input')
        let weatherDesc = await Api.getWeather(inputCity.value)
        DOM.cityName.textContent = weatherDesc.city
        DOM.temp.textContent = `${weatherDesc.temp}°C`
        DOM.icon.src = weatherDesc.iconUrl
        DOM.desc.textContent = weatherDesc.weather
        DOM.feels.textContent = `Feels like: ${weatherDesc.feelsLike}°C`
        DOM.pressure.textContent = `Pressure: ${weatherDesc.pressure} hPa`
        DOM.humidity.textContent = `Humidity level: ${weatherDesc.humidity}%`
        inputCity.value = ''
    }
    document.getElementById('submit-btn').addEventListener('click', refreshPage)
})()
