// Yes, this is not safe.
const key = "f7af98b9c9f23698c57dcaedc6ad2ab3";

function buttonClick() {
    const city = document.querySelector(".city-input").value;
    searchCity(city);
}

async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then(response => response.json());
    onTheScreen(data);
}

function onTheScreen(data) {
    if (data.message == "city not found") {
        document.querySelector(".city-input").style.border = "3px solid rgba(255, 0, 0, 0.8)";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".climate-characteristics").style.display = "none";
    } else {
        document.querySelector(".city-input").style.border = "none";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".climate-characteristics").style.display = "block";

        document.querySelector(".city").innerHTML = data.name;

        document.querySelector(".temperature").innerHTML = Math.floor(data.main.temp) + "°C";
    
        document.querySelector(".max").innerHTML = "Máxima: " + Math.floor(data.main.temp_max) + "°C";
    
        document.querySelector(".min").innerHTML = "Mínima: " + Math.floor(data.main.temp_min) + "°C";
    
        document.querySelector(".img-forecast").src = `https://openweathermap.org/img/wn/${data.weather[0].icon.replace("n", "d")}.png`;
    
        document.querySelector(".text-forecast").innerHTML = data.weather[0].description;
    
        document.querySelector(".humidity").innerHTML = "Umidade: "+ data.main.humidity + "%";
    }
};