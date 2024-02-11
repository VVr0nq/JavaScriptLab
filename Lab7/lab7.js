const apiKey = 'f04651528f76e3eed0d63e6ae4c2982f';
function getWeather(city) {
// Update pobiera
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherList = document.getElementById('weatherList');
                const listItem = document.createElement('li');
                listItem.innerHTML = `<h3>${data.name}</h3>
                                      <p>humidityTemp: ${data.main.temp}°C</p>
                                      <p>Wilgotność: ${data.main.humidity}%</p>
                                      <p>Conditions: ${data.weather[0].description}</p>
                                      <button onclick="removeCity('${data.name}')">Delete</button>`;
                weatherList.appendChild(listItem);//osatnie dziecko dodaje za lsita
                addCityToStorage(data.name); 
            } else {
                alert("City not found.");
            }
        })
        .catch(error => console.error("Error: ", error));
}
//dodaje
function addCityToStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (cities.length < 10) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    } else {
        alert("You can add only 10 cities");
    }
}
//usuwa
function removeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities = cities.filter(c => c !== city);
    localStorage.setItem('cities', JSON.stringify(cities));
    loadCities(); 
}
//clear return 
function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const weatherList = document.getElementById('weatherList');
    weatherList.innerHTML = ''; 
    cities.forEach(city => getWeather(city));
}
window.onload = loadCities;
//zwaraca element
document.getElementById('addCityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cityInput = document.getElementById('cityInput');
    getWeather(cityInput.value);
    cityInput.value = ''; 
});