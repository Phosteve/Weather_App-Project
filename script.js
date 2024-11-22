// http://api.weatherapi.com/v1/current.json?key=a9e2e228511a4d3099850959242211&q=Nairobi&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form');
const weatherIcon = document.querySelector("#weatherIcon");

form.addEventListener('submit', searchForLocation);

let target = 'Mumbai';

const fetchResults = async (targetLocation) =>{
    let url = `http://api.weatherapi.com/v1/current.json?key=a9e2e228511a4d3099850959242211&q=${targetLocation}&aqi=no`

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;

    updateDetails(temp, locationName, time, condition, icon);
}

function updateDetails(temp, locationName, time, condition, icon){
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    
    let currentDay = getDayName(new Date(splitDate).getDay())


    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
    weatherIcon.src = `http:${icon}`;

}

function searchForLocation(e){
    e.preventDefault();

    target = searchField.value;

    fetchResults(target);

    searchField.value = "";
}
fetchResults(target);

function getDayName(number){
    switch (number){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}


