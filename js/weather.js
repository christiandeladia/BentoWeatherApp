const apiKey = "06f56f79ac950459ad4e9a35cf76283e";

    const displayWeather = async (city) => {
        try {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

            console.log(weatherData);
            console.log(forecastData);

            document.getElementById("temperature").innerHTML = weatherData.main.temp.toFixed(1) + '<span>°c</span>';
            document.getElementById("minTemperature").innerHTML = weatherData.main.temp_min + "°C";
            document.getElementById("maxTemperature").innerHTML = weatherData.main.temp_max + "°C";
            document.getElementById("humidity-value").innerHTML = weatherData.main.humidity + "%";
            document.getElementById("feels_like-value").innerHTML = weatherData.main.feels_like + "°C";
            document.getElementById("pressure-value").innerHTML = weatherData.main.pressure + "mb";
            document.getElementById("wind_speed-value").innerHTML = weatherData.wind.speed.toFixed(2) + "km/h";
            document.getElementById("place").innerHTML = weatherData.name + ", " + weatherData.sys.country;
            document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            document.getElementById("description").innerHTML = weatherData.weather[0].description;

            const riseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const setTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            document.getElementById("rise").innerHTML = riseTime;
            document.getElementById("set").innerHTML = setTime;

        const rainChance = forecastData.list[0].pop * 100; 
        document.getElementById("rain-chance").innerHTML = `${rainChance.toFixed(0)}%`;


        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = ''; 

        const today = new Date().toLocaleDateString(); 

        const dailyData = {};

        forecastData.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString();
            if (!dailyData[day]) {
                dailyData[day] = [];
            }
            dailyData[day].push(forecast);
        });

        Object.keys(dailyData).forEach(day => {
            if (day !== today) {
                const dayData = dailyData[day];
                const tempSum = dayData.reduce((sum, entry) => sum + entry.main.temp, 0);
                const tempAvg = (tempSum / dayData.length).toFixed(2);


                const description = dayData[0].weather[0].description;
                const icon = dayData[0].weather[0].icon;

                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-item';
                forecastItem.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                    <h3>${day}</h3>
                    <p>${tempAvg}°C</p>
                    <p>${description}</p>
                    

                `;
                forecastElement.appendChild(forecastItem);
                
            }
        });

            const hourlyWeatherElement = document.getElementById('hourly-weather');
            hourlyWeatherElement.innerHTML = '';
            forecastData.list.slice(0, 7).forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
                const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const temp = forecast.main.temp.toFixed(1);
                const icon = forecast.weather[0].icon;

                const forecastItem = document.createElement('div');
                forecastItem.className = 'Days';
                forecastItem.innerHTML = `
                    <p>${day} ${time}</p>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />
                    <p>${temp}°C</p>
                `;
                hourlyWeatherElement.appendChild(forecastItem);
            });

        } catch (error) {
            console.error("Error fetching weather data: ", error);
            alert("Failed to fetch weather data. Please try again later.");
        }
    }

    function searchWeather() {
        const city = document.getElementById("cityInput").value;
        displayWeather(city);
    }

    function startTime() {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
        var ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
        hr = (hr == 0) ? 12 : hr;
        hr = (hr > 12) ? hr - 12 : hr;
        hr = checkTime(hr);
        min = checkTime(min);
        sec = checkTime(sec);
        document.getElementById("timeFormat").innerHTML = hr + ":" + min + ":" + sec + " " + ap;

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var curWeekDay = days[today.getDay()];
        var curDay = today.getDate();
        var curMonth = months[today.getMonth()];
        var curYear = today.getFullYear();
        var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
        document.getElementById("dateFormat").innerHTML = date;

        setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


    var hour = new Date().getHours();
var backgroundElement = document.getElementById("background");

if (hour >= 17 && hour <= 18) {
    backgroundElement.className = "bg_sunset";
} else if (hour >= 6 && hour <= 17) {
    backgroundElement.className = "bg_day";
} else if (hour >= 18 && hour <= 24) {
    backgroundElement.className = "bg_night";
} else if (hour >= 0 && hour <= 5) {
    backgroundElement.className = "bg_night";
} else if (hour >= 5 && hour <= 6) {
    backgroundElement.className = "bg_sunrise";
}

document.getElementById("toggle-background-checkbox").addEventListener("change", function() {
    if (this.checked) {
        backgroundElement.className = "bg_black";
    } else {
        if (hour >= 17 && hour <= 18) {
            backgroundElement.className = "bg_sunset";
        } else if (hour >= 6 && hour <= 17) {
            backgroundElement.className = "bg_day";
        } else if (hour >= 18 && hour <= 24) {
            backgroundElement.className = "bg_night";
        } else if (hour >= 0 && hour <= 5) {
            backgroundElement.className = "bg_night";
        } else if (hour >= 5 && hour <= 6) {
            backgroundElement.className = "bg_sunrise";
        }
    }
});

    displayWeather("Manila"); 
    startTime();