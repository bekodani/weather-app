// Digital clock

function clock() {
    var date = new Date();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }

    if (minutes <= 9) {
        minutes = '0' + minutes;
    }

    if (hours <= 9) {
        hours = '0' + hours;
    }

    var digitalClock = hours + ':' + minutes;

    document.getElementById('time').innerHTML = digitalClock;

    setTimeout(function(){
        clock();
    }, 1000);
}

clock();

// Get the current date

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    
      var month = new Array();
      month[0] = "Január";
      month[1] = "Február";
      month[2] = "Március";
      month[3] = "Április";
      month[4] = "Május";
      month[5] = "Junius";
      month[6] = "Július";
      month[7] = "Augusztus";
      month[8] = "Szeptember";
      month[9] = "Október";
      month[10] = "November";
      month[11] = "December";
    
      var d = new Date();
      var n = month[d.getMonth()];
    
      
      
    today = yyyy + '. ' + n + ' ' + dd + '.';
    document.getElementById('date').innerHTML = today;
    }
    
    getDate();

// Get the current day

var d = new Date();
var days = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
document.getElementById('day').innerHTML = days[d.getDay()];

// Weather datas
const inconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp h2");
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const locationElement = document.querySelector(".location");
const weekTempElement1 = document.querySelector(".temp1 p");
const weekTempElement2 = document.querySelector(".temp2 p");
const weekTempElement3 = document.querySelector(".temp3 p");
const weekTempElement4 = document.querySelector(".temp4 p");
const weekTempElement5 = document.querySelector(".temp5 p");
const feelsLike = document.getElementById("feels");
const descElement = document.getElementById("desc");
const iconElementDay1 = document.querySelector(".weather-icon-daily1");
const iconElementDay2 = document.querySelector(".weather-icon-daily2");
const iconElementDay3 = document.querySelector(".weather-icon-daily3");
const iconElementDay4 = document.querySelector(".weather-icon-daily4");
const iconElementDay5 = document.querySelector(".weather-icon-daily5");
const dayElement1 = document.querySelector(".temp1 h6");
const dayElement2 = document.querySelector(".temp2 h6");
const dayElement3 = document.querySelector(".temp3 h6");
const dayElement4 = document.querySelector(".temp4 h6");
const dayElement5 = document.querySelector(".temp5 h6");


const weather = {};

weather.temperature = {
    unit: 'celsius'
}

const KELVIN = 273;

const key = "9c6b98438775fa23220928690caade29";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {

}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${key}&lang=hu`
    let api2 = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=hu`;


Promise.all([
    fetch(api).then(data => data.json()),
    fetch(api2).then(data => data.json())
    ])
    //.then((data) => console.log(data))
    .then(function(data){
        weather.temperature.value = Math.floor(data[0].current.temp - KELVIN);
        weather.iconId = data[0].current.weather[0].icon;
        weather.feelslike = Math.floor(data[0].current.feels_like - KELVIN);
        weather.description = data[0].current.weather[0].description;
        weather.location = data[1].name;

        weather.sunRise = data[0].current.sunrise;
        weather.sunSet = data[0].current.sunset;
        // Data for the next 5 days
        weather.daily = Math.floor(data[0].daily[1].temp.day - KELVIN);
        weather.daily_night = Math.floor(data[0].daily[1].temp.night - KELVIN);

        weather.iconId1 = data[0].daily[1].weather[0].icon;
        weather.dayName1 = data[0].daily[1].dt;

        weather.daily1 = Math.floor(data[0].daily[2].temp.day - KELVIN);
        weather.daily_night1 = Math.floor(data[0].daily[2].temp.night - KELVIN);

        weather.iconId2 = data[0].daily[2].weather[0].icon;
        weather.dayName2 = data[0].daily[2].dt;

        weather.daily2 = Math.floor(data[0].daily[3].temp.day - KELVIN);
        weather.daily_night2 = Math.floor(data[0].daily[3].temp.night - KELVIN);

        weather.iconId3 = data[0].daily[3].weather[0].icon;
        weather.dayName3 = data[0].daily[3].dt;

        weather.daily3 = Math.floor(data[0].daily[4].temp.day - KELVIN);
        weather.daily_night3 = Math.floor(data[0].daily[4].temp.night - KELVIN);

        weather.iconId4 = data[0].daily[4].weather[0].icon;
        weather.dayName4 = data[0].daily[4].dt;

        weather.daily4 = Math.floor(data[0].daily[5].temp.day - KELVIN);
        weather.daily_night4 = Math.floor(data[0].daily[5].temp.night - KELVIN);

        weather.iconId5 = data[0].daily[5].weather[0].icon;
        weather.dayName5 = data[0].daily[5].dt;

        weather.daily45= Math.floor(data[0].daily[6].temp.day - KELVIN);
        weather.daily_night5 = Math.floor(data[0].daily[6].temp.night - KELVIN);
    })

    .then(function(){
        displayWeather();
    })
    .catch((err) => {
        console.log(err);
    });
};
// Get the name of the days

function dateName1() {
var dt = weather.dayName1
var dateNum = dt + '000'
return new Date(parseInt(dateNum)).toLocaleDateString('hu-hu', { weekday: 'short' });
}

function dateName2() {
    var dt = weather.dayName2
    var dateNum = dt + '000'
    return new Date(parseInt(dateNum)).toLocaleDateString('hu-hu', { weekday: 'short' });
}

function dateName3() {
    var dt = weather.dayName3
    var dateNum = dt + '000'
    return new Date(parseInt(dateNum)).toLocaleDateString('hu-hu', { weekday: 'short' });
}

function dateName4() {
    var dt = weather.dayName4
    var dateNum = dt + '000'
    return new Date(parseInt(dateNum)).toLocaleDateString('hu-hu', { weekday: 'short' });
}

function dateName5() {
    var dt = weather.dayName5
    var dateNum = dt + '000'
    return new Date(parseInt(dateNum)).toLocaleDateString('hu-hu', { weekday: 'short' });
}

// Convert the unix timestamp for sunrise data
function sunriseTimeConvert() { 
    unixTimestamp = weather.sunRise; 

    // convert to milliseconds 
    // and then create a new Date object 
    dateObj = new Date(unixTimestamp * 1000); 

    // Get hours from the timestamp 
    hours = dateObj.getUTCHours(); 

    // Get minutes part from the timestamp 
    minutes = dateObj.getUTCMinutes(); 



    formattedTime = hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0');

    return formattedTime;
} 

function sunsetTimeConvert() { 
    unixTimestamp = weather.sunSet; 

    // convert to milliseconds 
    // and then create a new Date object 
    dateObj = new Date(unixTimestamp * 1000); 

    // Get hours from the timestamp 
    hours = dateObj.getUTCHours(); 

    // Get minutes part from the timestamp 
    minutes = dateObj.getUTCMinutes(); 



    formattedTime = hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0');

    return formattedTime;
} 


 function displayWeather(){
    tempElement.innerHTML = `${weather.temperature.value}<span class ="spanom">°c</span>`;
    sunriseElement.innerHTML = sunriseTimeConvert();
    sunsetElement.innerHTML = sunsetTimeConvert();
    locationElement.innerHTML = `<small class="location-font">${weather.location}</small>`;
    weekTempElement1.innerHTML = `${weather.daily}/${weather.daily_night}°<span>C</span>`;
    weekTempElement2.innerHTML = `${weather.daily1}/${weather.daily_night1}°<span>C</span>`;
    weekTempElement3.innerHTML = `${weather.daily2}/${weather.daily_night2}°<span>C</span>`;
    weekTempElement4.innerHTML = `${weather.daily3}/${weather.daily_night3}°<span>C</span>`;
    weekTempElement5.innerHTML = `${weather.daily4}/${weather.daily_night4}°<span>C</span>`;
    feelsLike.innerHTML = `${weather.feelslike}`;
    descElement.innerHTML = `${weather.description}`;   
    inconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    iconElementDay1.innerHTML = `<img src="icons/${weather.iconId1}.png"/>`
    iconElementDay2.innerHTML = `<img src="icons/${weather.iconId2}.png"/>`
    iconElementDay3.innerHTML = `<img src="icons/${weather.iconId3}.png"/>`
    iconElementDay4.innerHTML = `<img src="icons/${weather.iconId4}.png"/>`
    iconElementDay5.innerHTML = `<img src="icons/${weather.iconId5}.png"/>`
    dayElement1.innerHTML = dateName1();
    dayElement2.innerHTML = dateName2();
    dayElement3.innerHTML = dateName3();
    dayElement4.innerHTML = dateName4();
    dayElement5.innerHTML = dateName5();
 }

 
 
 