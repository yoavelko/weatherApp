const input = document.getElementById('input');
const city = document.getElementById('city');
const date = document.getElementById('date');
const deg = document.getElementById('deg');
const type = document.getElementById('type');
const range = document.getElementById('range');
const min = document.getElementById('min');
const max = document.getElementById('max');
const video = document.getElementById('video');
const changer = document.getElementById('changer');
const n =  new Date().toString().split(' ');
let info = "";
let units = '&units=metric';
let degcon = '°C'

date.innerText = n[0] + " " + n[2] + " " + n[1] + " " + n[3];

document.querySelector('video').playbackRate = 0.8;

function fetcher() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${info}${units}&appid=2b72e75fb6d526eaeffa154f94030014`)
        .then(res => res.json())
        .then(x => {
            city.innerText = x.name + ", " + x.sys.country 
            deg.innerText = Math.floor (x.main.temp) + degcon, 
            type.innerText = x.weather[0].description, 
            range.innerText = Math.floor (x.main.temp_min) + degcon + " / " + Math.floor (x.main.temp_max) + degcon,
            console.log(x)
            switch (x.weather[0].main) {
                case ('Thunderstorm', 'Atmosphere'): {
                    video.setAttribute("src", "storm.mp4");
                } break;
                case ('Drizzle', 'Rain'): {
                    video.setAttribute("src", "rain.mp4");
                    document.getElementById('container').setAttribute('id', 'rain');
                } break;
                case ('Snow'): {
                    video.setAttribute("src", "snow.mp4")
                } break;
                case ('Clouds'): {
                    video.setAttribute("src", "clouds.mp4");
                    document.getElementById('container').setAttribute('id', 'clouds');
                    document.querySelector('video').style.objectFit= 'cover';
                } break;
                case ('Clear'): {
                    video.setAttribute("src", "sunny.mp4");
                    document.getElementById('container').setAttribute('id', 'sunny');

                } break;
            }
        })
}


input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        info=this.value
        fetcher()
    }
  });


changer.addEventListener("click", function() {
    if (units === '&units=metric') {
        units = '&units=imperial'
        degcon = '°F'
        changer.innerText= 'change to °C'
    } else {
        units = '&units=metric'
        degcon = '°C'
        changer.innerText= 'change to °F'
    }
    fetcher()
  });





