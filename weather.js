/**Getting all the elements from the DOM */
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city when the page loads
let cityInput = "San Francisco";

//Adding a click event to each city in the panel
cities.forEach((city) => {
   city.addEventListener('click', (e) => {
      //Changing from default city to the clicked one
      cityInput = e.target.innerHTML;

      //Function that fetch the API
      fetchWeatherData();

      //Simple animation
      app.style.opacity = "0";
   });
})

form.addEventListener('submit', (e) => {
   //If the search bar is empty, then show an alert.
   if (search.value.lenght == 0) {
      alert('Please type in a city name');
   }
   else
   {
      //Change the default city for the value introduced by the user
      cityInput = search.value;
      console.log("cityInput" + cityInput);
      //Call the function where the API display the info 
      fetchWeatherData();

      search.value = "";
      app.style.opacity = "0";
   }
   e.preventDefault();
})

//Funcion to display the weekdays
function dayOfTheWeek(day, month, year) {
   const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
   ];
   return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};



//Function that will fetch the API
function fetchWeatherData() {
   console.log(cityInput);
   const weather_url = 'https://api.weatherapi.com/v1/current.json?key=89f1d785c80f464e8d283009221410&q=' + cityInput;

   fetch(weather_url)
      
         .then(function (response) {
            return response.json();
      }) 
      .then(function(data){
         console.log(data);
         temp.innerHTML = data.current.temp_c + "&#176;";
         conditionOutput.innerHTML = data.current.condition.text;

         //Getting date and time from the city and extract the day, month and year
         // individually to be assigned in a variable
         const date = data.location.localtime;
         const y = parseInt(date.substr(0, 4));
         const m = parseInt(date.substr(5, 2));
         const d = parseInt(date.substr(8, 2));
         const time = date.substr(11);

         //Reformating the date.
         dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
         timeOutput.innerHTML = time;

         //Adding the name of the city into the page
         nameOutput.innerHTML = data.location.name;

         //Get the corrresponding icon from the flight_url
         const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);
         //console.log(iconId);
         icon.src = "./icons" + iconId;
         
         
         //Add the weather details to the page
         cloudOutput.innerHTML = data.current.cloud + " %";
         //console.log(data.current.cloud);
         humidityOutput.innerHTML = data.current.humidity + "%";
         windOutput.innerHTML = data.current.wind_kph + "kph";

         //Set default time of day
         let timeOfDay = "day";

         //Getting a unique id for each weather condition
         const code = data.current.condition.code;
         console.log(code);
         //Change to night if its night time in the city
         if (!data.current.is_day) {
            timeOfDay = "night";
         }

         if (code == 1000) {
            //Setting the background image
            app.style.backgroundImage = 'url(./images/' + timeOfDay + '/clear.jpg)';
            console.log(app.style.backgroundImage);
            //Changing the button color depending if it's day or night.
            btn.style.background = "#e5ba92";
            if (timeOfDay == "night") {
               btn.style.background = "#181e27";
            }
         }
         
         //Setting the cloudy weather
         else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1035 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
         ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if (timeOfDay == "night") {
               btn.style.background = "#181e27";
            }
         } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
         ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if (timeOfDay == "night") {
               btn.style.background = "#325c80";
            }
         } else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if (timeOfDay == "night") {
               btn.style.background = "#1b1b1b";
            }
         }

         //Fade in the page once all is done
         
         app.style.opacity = "1";
      })
   
      //If the user type a city that does not exist, throgh an alert.
      .catch(() => {
         alert('City not found, please try again...');
         app.style.opacity = "1";
      });
}

//Call the function that contains the API
fetchWeatherData();

app.style.opacity = "1";

