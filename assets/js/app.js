AOS.init();

let date = new Date();

FormatDate = {
    "weekday" : `long`,
    "month" : `long`,
    "year" : `numeric`,
    "day" : `numeric`
}

let currentDate = date.toLocaleDateString("en-US",FormatDate)
document.getElementById("date").innerText = currentDate;

function callApi(){ // let the function is an asynchronous to server handle this function in a seperate place don't let this function to block the process so the this method and other code line goes parallel
    // let responce = await fetch("http://api.weatherapi.com/v1/current.json?key=f27a89c394034bf892765440251308&q=Panadura&aqi=no");
    // let data = await responce.json();
    // console.log(data.location.name); async infront of the function

    fetch("http://api.weatherapi.com/v1/current.json?key=f27a89c394034bf892765440251308&q=Panadura&aqi=no")
    .then(responce => responce.json())
    .then(data => {
        // console.log(data.location.name);
        // console.log(data.location.region);
        // console.log(data.location.country);
        setDetails(data);
    });
}

function setDetails(data){
    let location = document.getElementById("location");
    let date = document.getElementById("date");
    let weatherCondition = document.getElementById("weatherCondition");
    let temparature = document.getElementById("temparature");
    let feelsLike = document.getElementById("feelsLike");

    // Colombo, Sri Lanka

    location.innerText = data.location.name+", "+data.location.country;
    weatherCondition.innerText = data.current.condition.text;

}


callApi();