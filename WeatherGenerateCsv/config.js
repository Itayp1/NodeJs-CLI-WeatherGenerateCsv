require("dotenv").config();

module.exports = {

    APPID: process.env.APPID,
    BASE_URL: process.env.baseURL || 'https://api.openweathermap.org',
    LIST_OF_CITIES: [
        "Jerusalem,IL",
        "New York, US",
        "Dubai,AE",
        "Lisbon, PT",
        "Oslo, NO",
        "paris,FR",
        "Berlin, DE",
        "Athens, GR",
        "Seoul, KR",
        "Singapore, MY"
    ],
    DAYS: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

}