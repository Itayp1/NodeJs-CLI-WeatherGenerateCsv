
const axios = require("axios");
const weatherApi = require("./api");
const { DAYS, LIST_OF_CITIES } = require('./config');
const generateCsv = require('./generateCsv');

//make array of promises for send the request simultaneously
const listOfCitiesApi = LIST_OF_CITIES.map(city => {
  return weatherApi.get(`/data/2.5/forecast?q=${city}`)
});

const json = {};

//this will be executed only when all requests are complete
axios.all(listOfCitiesApi)
  .then(responseArr => {

    //irritate over the array of each response
    responseArr.forEach(cityResult => {

      //irritate over the array of the list
      cityResult.data.list.forEach(obj => {

        //get the day from the utc time
        const day = getDay(obj.dt)

        //initialize json with date every new day 
        if (!json[day]) {
          json[day] = {};
          json[day].cityWithHighestTemp = obj.main.temp_max;
          json[day].cityWithHighestTempName = cityResult.data.city.name;
          json[day].cityWithLowestTemp = obj.main.temp_min;
          json[day].cityWithLowestTempName = cityResult.data.city.name;
          json[day].citiesWithRain = []; //
          obj.weather[0].main == "Rain" ? json[day].citiesWithRain.push(cityResult.data.city.name) : null;

        } else {
          //check for the existence of the city in the array
          if (obj.weather[0].main == "Rain") {
            json[day].citiesWithRain.indexOf(cityResult.data.city.name) === -1 ? json[day].citiesWithRain.push(cityResult.data.city.name) : null;
          }
          //set the max / lowest temp in case 
          if (obj.main.temp_max > json[day].cityWithHighestTemp) {
            json[day].cityWithHighestTemp = obj.main.temp_max
            json[day].cityWithHighestTempName = cityResult.data.city.name;
          }
          if (obj.main.temp_min < json[day].cityWithLowestTemp) {
            json[day].cityWithLowestTemp = obj.main.temp_min;
            json[day].cityWithLowestTempName = cityResult.data.city.name;
          }


        }


      });

    });

    //send the json  to the converter function
    generateCsv(json)


  }).catch(err => console.log(err))



const getDay = (utcTime) => {
  let date = new Date(utcTime * 1000).getDay();
  day = DAYS[date];
  return day
}