// Get Time 

window.addEventListener("DOMContentLoaded", showTime());
function showTime() {
  //date object
  let date = new Date();
  let time = date.toLocaleTimeString('en-US', {
    hour12: false,
  });

  document.getElementById("displayClock").innerHTML = time;
  setTimeout(showTime, 1000);
}
// End time

// Start Codeforces latest contest list

//  name
//  startTimeSeconds
//  durationSeconds
//  relativeTimeSeconds
const codeApi = "https://codeforces.com/api/contest.list?gym=false";

fetch(codeApi)
  .then(function (response) {
    return response.json();
  })
  .then((data)=> {
    console.log(data);
    let output = "";
    let contestArr =[];
    for(let i = 0; i < Math.min(5, (data.result.length)); i++){
      contestArr.push(data.result[i]);
    }
    console.log(contestArr);

    contestArr.forEach(function (contest) {
      contest.startTimeSeconds = new Date(contest.startTimeSeconds * 1000).toLocaleTimeString();
      contest.durationSeconds = contest.durationSeconds / 3600;
      output += `
      
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${contest.name}</h5>
          <p class="card-start">Start Time: ${contest.startTimeSeconds}</p>
          <p class="card-duration">Duration: ${contest.durationSeconds} hr</p>
        </div>
      </div>
      `;
    });
    document.querySelector(".lside").innerHTML = output;
  })


// End codeforces latest contest list

// Get random image from Unsplash API
let image = document.querySelector('body')
image.style.backgroundImage = "url('bg.jpg')"

const apiImage = {
  clientID: "us8K1PeIvZ2YkePSsFCgwsQeDYi58VMLHmpJtI7Kvuw"
}
let endpoint = 'https://api.unsplash.com/photos/random/?client_id=us8K1PeIvZ2YkePSsFCgwsQeDYi58VMLHmpJtI7Kvuw'

//  enable below to use unsplash random image
// fetch(endpoint)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (jsonData) {
//     console.log(jsonData),
//       link = jsonData.urls.full,
//       console.log(link);
//       image.style.backgroundImage = "url(" + link + ")";
//   })

  // End

  // Weather start
const api = {
  key: "92f79e1e19d94f3be7cd1a2ac6fd588e",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}