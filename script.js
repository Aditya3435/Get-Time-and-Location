'use strict';

const more = document.querySelector('.more-section');
const details = document.querySelector('.details');
const author = document.querySelector(".author")
const moreSvg = document.getElementById('more-svg');
const refresh = document.getElementById('refresh-quotes');
const period = document.querySelector('.am-pm');

function getQuote() {
  fetch('https://api.quotable.io/random')
  .then((response => response.json())
  .then(data => {

    document.getElementById("quote-lines").textContent = data.content;

    if (data.author == null) {
      author.textContent = 'Unknown author';
    } else {
      author.textContent = data.author;
    }
  }).catch((err) => console.error(err)));
}


// Get time
function getTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();

  let greet = '';
  if (hour >= 5 && hour <= 11) {
    greet = 'morning';
  } else if (hour >= 12 && hour <= 17) {
    greet = 'afternoon';
  }
  else {
    greet = 'evening';
  }
  document.getElementById('greet').textContent = `good ${greet}`

  if (hour >= 5 && hour <= 17) {
    document.querySelector('.container img').setAttribute("src", "./images/light_11zon.jpg");
    document.querySelector('.upper svg').innerHTML = "<path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z\"fill=\"rgba(236,240,241,1)\" />\"";

  } else {
    document.querySelector('.container img').setAttribute("src", "./images/dark_11zon.jpg");
    document.querySelector('.upper svg').innerHTML = "<path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-6.671-5.575A8 8 0 1 0 16.425 5.328a8.997 8.997 0 0 1-2.304 8.793 8.997 8.997 0 0 1-8.792 2.304z\" stroke=\"#fff\" fill=\"rgba(255,255,255,1)\"/>\"";
    details.style.color = '#fff';
    details.style.background = '#000';
  }

  // Time setup
  if (minute < 10) {
    minute = "0" + minute
  }

  if (hour === 0) {
    hour = 12
    period.textContent = "am";
  } else if (hour === 12) {
    period.textContent = "pm";
  } else if (hour > 12) {
    hour -= 12;
    period.textContent = "pm";
  } else {
    period.textContent = "am";
  }
  document.querySelector(".time h1").textContent = `${hour}:${minute}`;

  //Update time
  let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
  setTimeout(getTime, interval)
}



// get Times 
  axios.get('https://worldtimeapi.org/api/ip')
    .then((regionRes) => {
      const region = regionRes.data;
      document.querySelector('.period').children[1].textContent = region.abbreviation;

      document.querySelector('.country').textContent = region.timezone;
      document.getElementById('year-day').textContent = region.day_of_year;
      document.getElementById('week-day').textContent = region.day_of_week;
      document.getElementById('week-number').textContent = region.week_number;
    })
    .catch(err => console.error(err));

const key = config.SECRET_API_KEY;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${key}`,
		'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
	}
};
// state and country
fetch('https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);
    const countryname = response.country;
    const statename = response.state;
    document.querySelector('.location').textContent = `${statename}, ${countryname}`;
  })
	.catch(err => console.error(err));



//refresh button
refresh.addEventListener('click', getQuote);

console.log('eue');

more.addEventListener('click', () => {
  if (more.children[0].innerHTML == "More") {
    more.children[0].innerHTML = "Less"
    details.classList.remove('hidden');
    window.scrollBy(0, 400);
  }
  else {
    more.children[0].innerHTML = "More"
    window.scrollBy(0, -400);
  }
  moreSvg.classList.toggle('rotate');
})
getTime();
getQuote();

