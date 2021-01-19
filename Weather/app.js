window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".degree-section .forc");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b2581911eb252d200c7cca2b5321c400`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data, data.main.temp, data.weather[0].icon);
                    const {temp,humidity} = data.main;

                    const iconimg = data.weather[0].icon;
                    let temperature = temp -273.15;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = data.weather[0].main;
                    locationTimezone.textContent = data.name;

                    let far = (temperature * 9)/5 + 32;

                    document.querySelector(".icons").src = `http://openweathermap.org/img/wn/${iconimg}@2x.png`;
                    degreeSection.addEventListener('click', ()=> {
                        if(temperatureSpan.textContent !== "F"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = far;
                        }else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
                .catch(e => {
                    console.log("error",e);
                });
        });

    } else {
        locationTimezone.textContent = "Encountered some error";
    }
});