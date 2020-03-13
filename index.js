// Data for weather

const weatherData = {
    tempUnit: "C",
    windSpeedUnit: "m/s",
    days: [
        { day: "Mon", temp: 22, windDirection: "north-east", windSpeed: 10 , type: "sunny" },
        { day: "Tue", temp: 14, windDirection: "north-west", windSpeed: 14 , type: "rainy" },
        { day: "Wed", temp: 17, windDirection: "south-east", windSpeed: 12 , type: "cloudy" },
        { day: "Thu", temp: 27, windDirection: "west", windSpeed: 5 , type: "sunny" },
        { day: "Fri", temp: 24, windDirection: "north-west", windSpeed: 8 , type: "sunny" },
        { day: "Sat", temp: 16, windDirection: "east", windSpeed: 13 , type: "cloudy" },
        { day: "Sun", temp: 12, windDirection: "north", windSpeed: 17 , type: "rainy" }
    ]
};

// Html selectors

const selectDay = document.querySelector('#selectDay');
const day = document.querySelector('#day');
const temp = document.querySelector('#temp');
const windSpeed = document.querySelector("#windSpeed");
const type = document.querySelector('#type');
const windDirection = document.querySelector('#windDirection');
const tempUnit = document.querySelector('#tempUnit');
const windSpeedUnit = document.querySelector('#windSpeedUnit');
const selectTempUnit = document.querySelector('#selectTempUnit');
const selectWindSpeed = document.querySelector('#selectWindSpeed');

const days = weatherData.days;

// Loop to get all days to select

days.forEach(eachDay => {
    const option = document.createElement("option");
    option.value = eachDay.day;
    option.innerHTML = eachDay.day;
    selectDay.appendChild(option);
})

// Loop to get all data for a day

const dayLoop = choosenDay => {
    days.forEach(eachDay => {
        if (eachDay.day === choosenDay) {
            day.textContent = dayFunc(eachDay.day);
            temp.textContent = selectTempUnit.value === "C" ? eachDay.temp : +eachDay.temp + 273.15;
            windSpeed.textContent = selectWindSpeed.value === "m/s" ? eachDay.windSpeed : (+eachDay.windSpeed * 3.6).toFixed(2);
            type.textContent = eachDay.type;
            windDirection.innerHTML = windDirectionFunc(eachDay.windDirection);
            tempUnit.textContent = selectTempUnit.value === "C" ? "C" : "K";
            windSpeedUnit.textContent = selectWindSpeed.value === "m/s" ? "m/s" : "km/h";
        }
    })
}

// Switch method to get icon for wind direction

const windDirectionFunc = windDirection => {
    switch(windDirection) {
        case 'north':
            return '<span class="iconify" data-icon="wi:direction-up" data-inline="false"></span>';
        case 'north-east':
          return '<span class="iconify" data-icon="wi:direction-up-right" data-inline="false"></span>';
        case 'north-west':
          return '<span class="iconify" data-icon="wi:direction-up-left" data-inline="false"></span>';
        case 'west':
            return '<span class="iconify" data-icon="wi:direction-left" data-inline="false"></span>';
        case 'east':
            return '<span class="iconify" data-icon="wi:direction-right" data-inline="false"></span>';
        case 'south':
            return '<span class="iconify" data-icon="wi:direction-down" data-inline="false"></span>';
        case 'south-east':
            return '<span class="iconify" data-icon="wi:direction-down-left" data-inline="false"></span>';
        case 'south-west':
            return '<span class="iconify" data-icon="wi:direction-down-right" data-inline="false"></span>';
        default:
          return "Not found";
      }
}

// Switch method to get full day

const dayFunc = day => {
    switch(day) {
        case 'Mon':
            return "Monday";
        case 'Tue':
            return "Tuesday";
        case 'Wed':
            return "Wednesday";
        case 'Thu':
            return "Thursday";
        case 'Fri':
            return "Friday";
        case 'Sat':
            return "Saturday";
        case 'Sun':
            return "Sunday";
    }
}

// Listener for selected day to get information

selectDay.addEventListener('change', event => {
    const day = event.target.value;
    dayLoop(day);
})

// Onload to get information

window.onload = event => {
    const day = selectDay.value;
    dayLoop(day);
}

// Listener to change temperature unit

selectTempUnit.addEventListener('change', event => {
    const selectedTempUnit = event.target.value;
    if (selectedTempUnit === "C") {
        temp.textContent = +temp.textContent - 273.15;
        tempUnit.textContent = "C";
    } else {
        temp.textContent = +temp.textContent + 273.15;
        tempUnit.textContent = "K";
    }
})

// Listener to chagne wind speed unit

selectWindSpeed.addEventListener('change', event => {
    const selectWindSpeed = event.target.value;
    if (selectWindSpeed === "m/s") {
        windSpeed.textContent = (+windSpeed.textContent / 3.6).toFixed(2);
        windSpeedUnit.textContent = "m/s";
    } else {
        windSpeed.textContent = (+windSpeed.textContent * 3.6).toFixed(2);
        windSpeedUnit.textContent = "km/h";
    }
})