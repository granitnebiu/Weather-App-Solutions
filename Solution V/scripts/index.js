


// /* **********************************************
// **
// ** UI Elements Module
// **
// ** - this module will be responsible for controling UI Elements like 'menu'
// ** ******************************************** */

const UI = (function () {
    let menu = document.querySelector("#menu-container");

    // show the app and hide the loading screen
    const showApp = () => {
        document.querySelector("#app-loader").classList.add('display-none');
        document.querySelector("main").removeAttribute('hidden');
    };

    // hide the app and show the loading screen
    const loadApp = () => {
        document.querySelector("#app-loader").classList.remove('display-none');
        document.querySelector("main").setAttribute('hidden', 'true');
    };

    // show menu
    const _showMenu = () => menu.style.right = 0;

    // hide menu
    // get menu width in % 
    const _hideMenu = () => menu.style.right = '-' + Math.round(menu.offsetWidth / window.innerWidth * 100) + '%'


    const _toggleHourlyWeather = () => {
        let hourlyWeather = document.querySelector("#hourly-weather-wrapper"),
            arrow = document.querySelector("#toggle-hourly-weather").children[0],
            visible = hourlyWeather.getAttribute('visible'),
            dailyWeather = document.querySelector("#daily-weather-wrapper");

        // if the hourly weather wrapper IS NOT visible, then show it
        if (visible == 'false') {
            // change the value of 'visible' attr
            hourlyWeather.setAttribute('visible', 'true');
            // show the panel by moving him at the bottom of the paggin
            hourlyWeather.style.bottom = 0;
            // rotate the arrow
            arrow.style.transform = "rotate(180deg)";
            // hide the daily weather panel
            dailyWeather.style.opacity = 0;
            // if the hourly weather wrapper IS visible, then hide it
        } else if (visible == 'true') {
            hourlyWeather.setAttribute('visible', 'false');
            hourlyWeather.style.bottom = '-100%';
            arrow.style.transform = "rotate(0deg)";
            dailyWeather.style.opacity = 1;
        } else console.error("Unknown state of the hourly weather panel and visible attribute");
    };

    // show alert 'no city found'
    const noCityFoundAlert = () => {
        let alert = document.querySelector("#alert-city-not-foud");
        alert.style.bottom = '20px';

        // hide the alert after 2 seconds
        setTimeout(() => { alert.style.bottom = '-50px' }, 2000)
    }

    // draw all the weather data on the interface
    const drawWeatherData = (data, location) => {

        // store the data from dark sky in 3 variables
        let currentlyData = data.currently,   // data for the currently weather panel
            dailyData = data.daily.data,      // data for the daily weather panel
            hourlyData = data.hourly.data,    // data for the hourly weather panel
            // make an array with week days, because we will transform the timestamp returned by dark sky
            // in a valid day, but the method .getDay() will return the index of the day inside this array
            weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            // container for dailyWeatherWrapper
            dailyWeatherWrapper = document.querySelector("#daily-weather-wrapper"),
            // model for daily weather
            dailyWeatherModel,
            // store the day
            day,
            // store a string with min max temp 22 / 30
            maxMinTemp,
            // store the daily icon
            dailyIcon,
            // container for hourlyWeatherWrapper
            hourlyWeatherWrapper = document.querySelector("#hourly-weather-wrapper"),
            // model for hourly weather
            hourlyWeatherModel,
            // store the hourly icon
            hourlyIcon;

        // set current weather
        // ===================
        // set current location on the currently weather panel and inside the menu
        document.querySelectorAll(".location-label").forEach((e) => {
            e.innerHTML = location;
        });
        // set the background
        document.querySelector('main').style.backgroundImage = `url("./assets/images/bg-images/${currentlyData.icon}.jpg")`;
        // set the icon
        document.querySelector("#currentlyIcon").setAttribute('src', `./assets/images/summary-icons/${currentlyData.icon}-white.png`);
        // set summary
        document.querySelector("#summary-label").innerHTML = currentlyData.summary;
        // set temperature from Fahrenheit -> Celcius
        document.querySelector("#degrees-label").innerHTML = Math.round((
            currentlyData.temperature - 32) * 5 / 9) + '&#176;'

        // set humidty
        document.querySelector("#humidity-label").innerHTML = Math.round(currentlyData.humidity * 100) + '%';
        // set wind speed
        document.querySelector("#wind-speed-label").innerHTML = (currentlyData.windSpeed * 1.6093).toFixed(1) + ' kph';

        // set daily weather
        // ===================
        // delete previously added items
        while (dailyWeatherWrapper.children[1]) {
            dailyWeatherWrapper.removeChild(dailyWeatherWrapper.children[1])
        }

        // build weather data for the next seven days
        for (let i = 0; i <= 6; i++) {
            // clone the node and remove display none close
            dailyWeatherModel = dailyWeatherWrapper.children[0].cloneNode(true);
            dailyWeatherModel.classList.remove('display-none');
            // set the day
            day = weekDays[new Date(dailyData[i].time * 1000).getDay()]
            dailyWeatherModel.children[0].children[0].innerHTML = day;
            // set min/max temperature for the next days in Celcius
            maxMinTemp = Math.round((dailyData[i].temperatureMax - 32) * 5 / 9) + '&#176;' + '/' + Math.round((dailyData[i].temperatureMin - 32) * 5 / 9) + '&#176;';
            dailyWeatherModel.children[1].children[0].innerHTML = maxMinTemp;
            // set daily icon
            dailyIcon = dailyData[i].icon;
            dailyWeatherModel.children[1].children[1].children[0].setAttribute('src', `./assets/images/summary-icons/${dailyIcon}-white.png`);
            // append the model
            dailyWeatherWrapper.appendChild(dailyWeatherModel);
        }
        dailyWeatherWrapper.children[1].classList.add('current-day-of-the-week');

        // set hourly weather
        // ===================
        // delete previously added items
        while (hourlyWeatherWrapper.children[1]) {
            hourlyWeatherWrapper.removeChild(hourlyWeatherWrapper.children[1])
        }

        // build weather data for the next 24 hours
        for (let i = 0; i <= 24; i++) {
            // clone the node and remove display none close
            hourlyWeatherModel = hourlyWeatherWrapper.children[0].cloneNode(true);
            hourlyWeatherModel.classList.remove('display-none');
            // set hour
            hourlyWeatherModel.children[0].children[0].innerHTML = new Date(hourlyData[i].time * 1000).getHours() + ":00";

            // set temperature
            hourlyWeatherModel.children[1].children[0].innerHTML = Math.round((hourlyData[i].temperature - 32) * 5 / 9) + '&#176;';
            // set the icon
            hourlyIcon = hourlyData[i].icon;
            hourlyWeatherModel.children[1].children[1].children[0].setAttribute('src', `./assets/images/summary-icons/${hourlyIcon}-grey.png`);

            // append model
            hourlyWeatherWrapper.appendChild(hourlyWeatherModel);
        }
        // after .... show the app
        UI.showApp();
    };


    // menu events
    document.querySelector("#open-menu-btn").addEventListener('click', _showMenu);
    document.querySelector("#close-menu-btn").addEventListener('click', _hideMenu);

    // hourly-weather wrapper event
    document.querySelector("#toggle-hourly-weather").addEventListener('click', _toggleHourlyWeather);

    // export
    return {
        showApp,
        loadApp,
        drawWeatherData,
        noCityFoundAlert
    }

})();



// /* **********************************************
// **
// ** Local Storage Api
// **
// ** - this module will be responsible for saving, retriving and deleting the cities added by user
const LOCALSTORAGE = (function () {

    // intermediate variable to manipulate local storage item
    let savedCities = [];

    // save a new object inside the array and then save the array in local storage
    const save = (label, lat, lng) => {
        let citiesLabes = savedCities.map(city => city.label);
        if (citiesLabes.indexOf(label) != -1) return false;  // return false - the item was not saved

        savedCities.push({ label, lat, lng });
        localStorage.setItem('savedCities', JSON.stringify(savedCities));

        return true; // the item was saved
    };

    // get the items from local storage and store them inside "savedCities"
    const get = () => {
        if (localStorage.getItem('savedCities') != null)
            savedCities = JSON.parse(localStorage.getItem('savedCities'));
    };

    // remove an element from "savedCities" and then update the local storage
    const remove = (index) => {
        // check if the index is a valid one (index < the array length)
        if (index < savedCities.length) {
            // delete the element from the positon "index"
            savedCities.splice(index, 1);
            // update
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
        }
    };

    // save the index of the city selected by the user
    const saveSelectedCityIndex = (label) => {
        let cityIndex = savedCities.map(city => city.label).indexOf(label);

        // save the index of the selected city inside the savedCities arr
        localStorage.setItem('selectedCityIndex', cityIndex);
    };

    // update the index of the selected city
    const updateSelectedCityIndex = () => {
        let currentIndex = localStorage.getItem('selectedCityIndex');
        // save the index of the selected city inside the savedCities arr
        localStorage.setItem('selectedCityIndex', currentIndex - 1);
    };


    // getter "savedCities"
    const getSavedCities = () => savedCities;

    return {
        save,
        get,
        remove,
        getSavedCities,
        saveSelectedCityIndex,
        updateSelectedCityIndex
    }
})();


// /* **********************************************
// **
// ** Saved Cities module
// **
// ** - this module will be responsible for showing on the UI saved cities from the local storage
// ** and from here user will be able to delete or switch between the city he wants to see data
// ** ******************************************** */
const SAVEDCITIES = (function () {
    let container = document.querySelector("#saved-cities-wrapper");

    // draw a saved city inside the menu
    const drawCity = (city) => {
        let cityBox = document.createElement('div'),
            cityWrapper = document.createElement('div'),
            deleteWrapper = document.createElement('div'),
            cityTextNode = document.createElement('h1'),
            deleteBtn = document.createElement('button');

        cityBox.classList.add('saved-city-box', 'flex-container');
        cityTextNode.innerHTML = city;
        cityTextNode.classList.add('set-city');
        cityWrapper.classList.add('ripple', 'set-city');
        cityWrapper.append(cityTextNode);
        cityBox.append(cityWrapper);

        deleteBtn.classList.add('ripple', 'remove-saved-city');
        deleteBtn.innerHTML = '-';
        deleteWrapper.append(deleteBtn);
        cityBox.append(deleteWrapper);

        container.append(cityBox);
    };

    // delete a city
    const _deleteCity = (cityHTMLBtn) => { // cityHTMLBtn -> the minus button on which the user clicked
        // create a real array with all the saved cities from the interface
        let nodes = Array.prototype.slice.call(container.children),
            // go up in DOM tree until you find the wrapper for the city
            cityWrapper = cityHTMLBtn.closest('.saved-city-box'),
            //get the index of that city inside the array
            cityIndex = nodes.indexOf(cityWrapper);
        // remove from local storage and interface
        LOCALSTORAGE.remove(cityIndex);
        cityWrapper.remove();

        // check if the deleted element is the same with the current city(selectedCity)
        if(cityIndex == localStorage.getItem('selectedCityIndex')){
            let cities = LOCALSTORAGE.getSavedCities();
            // check if there are any elements left
            if (cities.length != 0) {

                let lastCityInserted = cities[cities.length - 1 ],
                    darkSkyURL = WEATHER.getDarkSkyURL(lastCityInserted.lat, lastCityInserted.lng);

                // get dark sky data for the last city added
                WEATHER.getDarkSkyData(darkSkyURL, lastCityInserted.label)
            } else location.reload()
        }

        //if the element deleted has an index < than the index saved in local storage then update the index from local storage
        if (cityIndex < localStorage.getItem('selectedCityIndex')) LOCALSTORAGE.updateSelectedCityIndex();
    }

    // click event on minus button
    // add an event on the document, because these elements will be created dinamically
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-saved-city')) {
            _deleteCity(event.target);
        }
    });

    // click event on a city from menu 
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('set-city')) {
            let nodes = Array.prototype.slice.call(container.children),
                cityWrapper = event.target.closest('.saved-city-box'),
                cityIndex = nodes.indexOf(cityWrapper),
                savedCities = LOCALSTORAGE.getSavedCities(),
                darkSkyURL = WEATHER.getDarkSkyURL(savedCities[cityIndex].lat, savedCities[cityIndex].lng);

            // get dark sky data for the last city added
            WEATHER.getDarkSkyData(darkSkyURL, savedCities[cityIndex].label)
        }
    });

    return {
        drawCity
    }
})();


// /* **********************************************
// **
// ** Get location Module
// **
// ** - this module will be responsible for getting the data about the location to search for weather
// ** ******************************************** */

const GETLOCATION = (function () {

    let location;

    const locationInput = document.querySelector("#location-input"),
        addCityBtn = document.querySelector("#add-city-btn");


    //handle submit event 
    const _addCity = () => {
        location = locationInput.value;
        locationInput.value = "";
        addCityBtn.setAttribute('disabled', 'true');
        addCityBtn.classList.add('disabled');

        // get weather data
        WEATHER.getWeather(location, true)
    }

    // check for changes in input element and set it as enable or disable
    locationInput.addEventListener('input', function () {
        let inputText = this.value.trim();

        // check if the input is empty
        if (inputText != '') {
            addCityBtn.removeAttribute('disabled');
            addCityBtn.classList.remove('disabled');
        } else {
            addCityBtn.setAttribute('disabled', 'true');
            addCityBtn.classList.add('disabled');
        }
    })

    addCityBtn.addEventListener('click', _addCity);
})();



/* **********************************************
**
** Get Weather data
**
// ** - this module will aquire weather data and then it will pass to another module which will put the data on UI
// ** ******************************************** */

const WEATHER = (function () {

    // private keys for the api
    const darkSkyKey = '7f20e4610039df26c1e19328bbcf14ce',
        geocoderKey = '6f777fc409804277843caf8e13bb6736';


    // return a valid URL for OpenCage API
    const _getGeocodeURL = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geocoderKey}`;

    // return a valid URL for DarkSky API
    const getDarkSkyURL = (lat, lng) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;

    // get weather data from Dark Sky
    const getDarkSkyData = (url, location) => {
        axios.get(url)
            .then((res) => {
                // draw the data on the interface
                UI.drawWeatherData(res.data, location);
                //save the selected city inside local storage;
                LOCALSTORAGE.saveSelectedCityIndex(location)
            })
            .catch((err) => {
                console.error(err);
            })
    };

    const getWeather = (location, save) => {
        // set ap as loading until the data is received
        UI.loadApp();

        // get formated url for OpenCageData
        let geocodeURL = _getGeocodeURL(location);

        // get data from OpenCageData
        axios.get(geocodeURL)
            .then((res) => {
                // if the location is invalid....
                if (res.data.results.length == 0) {
                    UI.showApp();
                    UI.noCityFoundAlert();
                    return;
                }

                // get lat and lng from OpenCageData
                let lat = res.data.results[0].geometry.lat,
                    lng = res.data.results[0].geometry.lng;

                // if u want to save the location for which the data was received in local storage
                if (save) {
                    let saved = LOCALSTORAGE.save(location, lat, lng);
                    if (saved)
                        SAVEDCITIES.drawCity(location);
                }

                // get a formated url for dakSky
                let darkskyURL = getDarkSkyURL(lat, lng);

                // call the function to get weather data
                getDarkSkyData(darkskyURL, location);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return {
        getWeather,
        getDarkSkyURL,
        getDarkSkyData
    }
})();

// /* **********************************************
// **
// ** Init
// **
// ** 
// ** ******************************************** */

// when the app has finished loading the content, images, files .....
window.onload = function () {
    // get items from local storage and store them inside "savedCities" array
    LOCALSTORAGE.get();
    // get that array and store it in a variable for ease of use
    let cities = LOCALSTORAGE.getSavedCities();
    // check if there were any elements inside the local storage
    if (cities.length != 0) {
        // if so then draw each saved city inside the menu
        cities.forEach((city) => SAVEDCITIES.drawCity(city.label));

        // get dark sky url 
        let selectedCity = cities[localStorage.getItem('selectedCityIndex')],
            darkSkyURL = WEATHER.getDarkSkyURL(selectedCity.lat, selectedCity.lng);

        // get dark sky data for the last city added
        WEATHER.getDarkSkyData(darkSkyURL, selectedCity.label)
    }
    // show the app in case that local storage was empty
    else UI.showApp();

}