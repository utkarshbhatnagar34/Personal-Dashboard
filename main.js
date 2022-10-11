// Get Time 
const showTime=()=> {
  //date object
  let date = new Date();
  let time = date.toLocaleTimeString('en-US', {
    hour12: false,
  });

  document.getElementById("displayClock").innerHTML = time;
  setTimeout(showTime, 1000);
}
document.addEventListener("DOMContentLoaded", showTime());
// End time

// Start Codeforces latest contest list

//  name
//  startTimeSeconds
//  durationSeconds
//  relativeTimeSeconds
const codeApi = "https://codeforces.com/api/contest.list?gym=false";

const codeForce = async() => {
  const response = await fetch(codeApi);
  const data = await response.json();
  // const codeData = data.result;
  let output = "";
  let contestArr = [];
  for (let i = 0; i < Math.min(3, (data.result.length)); i++) {
    contestArr.push(data.result[i]);
  }
  console.log(contestArr);

  contestArr.forEach((contest)=> {
    contest.startTimeSeconds = new Date(contest.startTimeSeconds * 1000).toLocaleTimeString();
    contest.durationSeconds = contest.durationSeconds / 3600;
    output += `
      <div class="card">
          <div class="content">
              <div class="contentBx">
                  <h3 class="card-title">${contest.name}</h3>
                  <p class="card-start">Start Time: ${contest.startTimeSeconds}</p>
                  <br>
              </div>
              <div class="sci">
                  <p class="card-duration">Duration: ${contest.durationSeconds} hr
                      <a href="https://codeforces.com/contests">Codeforce</a>
                  </p>
              </div>
          </div>
      </div>
      `;
  });
  document.querySelector(".container").innerHTML = output;
};
codeForce();

  
// using fetch api
// fetch(codeApi)
//   .then(function (response) {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     let output = "";
//     let contestArr = [];
//     for (let i = 0; i < Math.min(3, (data.result.length)); i++) {
//       contestArr.push(data.result[i]);
//     }
//     console.log(contestArr);

//     contestArr.forEach(function (contest) {
//       contest.startTimeSeconds = new Date(contest.startTimeSeconds * 1000).toLocaleTimeString();
//       contest.durationSeconds = contest.durationSeconds / 3600;
//       output += `

// <div class="card">
//     <div class="content">
//         <div class="contentBx">
//             <h3 class="card-title">${contest.name}</h3>
//             <p class="card-start">Start Time: ${contest.startTimeSeconds}</p>
//             <br>
//         </div>
//         <div class="sci">
//             <p class="card-duration">Duration: ${contest.durationSeconds} hr
//                 <a href="https://codeforces.com/contests">Codeforce</a>
//             </p>
//         </div>
//      </div>
// </div>

//       `;
//     });
//     document.querySelector(".container").innerHTML = output;
//   })


// End codeforces latest contest list

// Get random image from Unsplash API
let image = document.querySelector('body')
image.style.backgroundImage = "url('bg.jpg')"

const apiImage = {
  clientID: "us8K1PeIvZ2YkePSsFCgwsQeDYi58VMLHmpJtI7Kvuw"
}
let endpoint = 'https://api.unsplash.com/photos/random/?client_id=us8K1PeIvZ2YkePSsFCgwsQeDYi58VMLHmpJtI7Kvuw'
  
// enable for unsplash

// Using async and await
async function getBackkgroudImage() {
  try{
    const response = await fetch(endpoint);
    const data = await response.json();
    image.style.backgroundImage = `url(${data.urls.full})`;
  }catch(error){
    console.log(error);
  }
}
getBackkgroudImage();

// using fetch api
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

// function getResults(query) {
//   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//       return weather.json();
//     }).then(displayResults);
// }

const getResults = async(query)=> {
  let url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
  try {
    const response = await fetch(url);
    const weather = await response.json();
    console.log(weather);
    displayResults(weather);
  } catch (error) {
    console.log(error);
  }
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


const showLatestWeather = async () => {
  let url = `${api.base}weather?q=Kolkata&units=metric&APPID=${api.key}`;
  try {
    const response = await fetch(url);
    const weather = await response.json();
    displayResults(weather);
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", showLatestWeather());


// Get google tasks
// const googleTasksApi = require('google-tasks-api')

// const apiTask = {
//   client:"104525583009-jtevvhpkkt96ffhrfqc86pta155avbsn.apps.googleusercontent.com",
// }

// async function getTasks() {
//   await googleTasksApi.autorize(apiTask.client);
//   const response = await listTaskLists();
//   const data = await response.json();
//   console.log(data);
// }
// getTasks();