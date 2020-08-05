//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (long , lat ,callback ) => {

    const url = 'http://api.weatherstack.com/current?access_key=31382affe05a3238e8607fba89573dc6&query=' + lat + ',' + long

    request( {url,json:true} , (error,{body})=>{
        if(error){
            callback('Unable to reach Weather Server', undefined)
        }else if(body.error)
         {
            callback(body.error.info, undefined)
        }else {
            callback(undefined, {
                Temp: body.current.temperature,
                Feels:body.current.feelslike
            })
        }

    })
}

    module.exports = forecast