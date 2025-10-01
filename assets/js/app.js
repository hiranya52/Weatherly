AOS.init();

let date = new Date();

FormatDate = {
    "weekday": `long`,
    "month": `long`,
    "year": `numeric`,
    "day": `numeric`
}

let currentDate = date.toLocaleDateString("en-US", FormatDate)
document.getElementById("date").innerText = currentDate;

// Click on SVG
document.getElementById("searchBtn").addEventListener("click", callApi);

// Press Enter inside input
//   document.getElementById("searchCity").addEventListener("keypress", function(e) {
//     if (e.key === "Enter") {
//       searchCity();
//     }
//   });

let searchCity = document.getElementById("txtSearch");
searchCity.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        console.log(searchCity.value);
        callApi(searchCity.value);
    }
});

function callApi(searchCity) {
    // let the function is an asynchronous to server handle this function in a seperate place don't let this function to block the process so the this method and other code line goes parallel
    // let responce = await fetch("http://api.weatherapi.com/v1/current.json?key=f27a89c394034bf892765440251308&q=Panadura&aqi=no");
    // let data = await responce.json();
    // console.log(data.location.name); async infront of the function


    fetch("http://api.weatherapi.com/v1/forecast.json?key=f27a89c394034bf892765440251308&q=${searchCity}&days=1&aqi=no&alerts=no")
        .then(responce => responce.json())
        .then(data => {
            // console.log(data.location.name);
            // console.log(data.location.region);
            // console.log(data.location.country);
            setDetails(data);
        });
}

function setDetails(data) {
    let location = document.getElementById("location");
    let date = document.getElementById("date");
    let weatherCondition = document.getElementById("weatherCondition");
    let temp = document.getElementById("temperature");
    let feelsLike = document.getElementById("feelsLike");
    let wind = document.getElementById("wind");
    let humidity = document.getElementById("humidity");
    let cloud = document.getElementById("cloud");
    let uvIndex = document.getElementById("uvIndex");
    let pressure = document.getElementById("pressure");
    let visibility = document.getElementById("visibility");


    location.innerText = data.location.name + ", " + data.location.country;
    weatherCondition.innerText = data.current.condition.text;
    feelsLike.innerText = "Feels like " + data.current.feelslike_c + "°C";
    temp.innerText = data.current.temp_c + "°C";
    wind.innerText = data.current.wind_kph + " KPH"
    humidity.innerText = data.current.humidity + "%"
    cloud.innerText = data.current.cloud + "%";
    uvIndex.innerText = data.current.uv;
    pressure.innerText = data.current.pressure_mb + " Mpa";
    visibility.innerText = data.current.vis_km + " km"


    // Hourly forecast

    for (let i = 0; i < 24; i++) {
        // let icon_1 = document.getElementById("icon_1");
        let weatherCondition = document.getElementById("weatherCondition_" + [i]);
        let temp = document.getElementById("temp_" + [i]);

        // icon_1.innerHTML = data.forecast.forecastday[0].hour[0].condition.icon;
        weatherCondition.innerText = data.forecast.forecastday[0].hour[i].condition.text;
        temp.innerText = data.forecast.forecastday[0].hour[i].temp_c + "°C";
    }
    // icon_1.innerHTML = data.forecast.forecastday[0].hour[0].condition.icon;
    // weatherCondition_1.innerText = data.forecast.forecastday[0].hour[0].condition.text;

}

