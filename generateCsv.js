const { parse } = require("json2csv");
const fs = require("fs");

module.exports = (json) => {
    //get all the keys (days names) from the json 
    const keys = Object.keys(json);
    //create array from the json object for the csv parse
    const jsonArray = Object.values(json)
    //set only the required keys
    const csvSortedArray = jsonArray.map((obj, index) => {
        tmpObj = {}
        tmpObj.day = keys[index]
        tmpObj.day
        tmpObj.cityWithHighestTempName = obj.cityWithHighestTempName
        tmpObj.cityWithLowestTempName = obj.cityWithLowestTempName
        tmpObj.citiesWithRain = obj.citiesWithRain

        return tmpObj
    })


    try {

        //parse the json array into csv string
        let csv = parse(csvSortedArray);
        //set the title with the required name and remove the [""] from the column of the cities with rain
        csv = replaceNames(csv)

        //create csv file
        fs.writeFileSync("weatherReport.csv", csv);

    } catch (err) {
        console.error(err);
    }

}

const replaceNames = (csvArray) => {
    csvArray = csvArray.replace("day", "DAY");
    csvArray = csvArray.replace("cityWithHighestTempName", "city with highest temp");
    csvArray = csvArray.replace("cityWithLowestTempName", "city with lowest temp");
    csvArray = csvArray.replace("citiesWithRain", "cities with rain");

    csvArray = csvArray.replace(/\[/g, '').replace(/\]/g, '').replace(/"""/g, '"').replace(/""/g, '"')




    return csvArray;
}

