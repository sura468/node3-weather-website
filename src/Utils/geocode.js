const request = require('request')

const geolocation = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyYTQ2OCIsImEiOiJja2Q5a3VzZmoyd2IyMnhxdmFraGF6anR3In0.nRhp3-l_WOFmMTRcFX3_MQ&limit=1'
    
     request( { url,json: true},(error,{body}) => {
          if(error){
               callback('Unable to connect to Location Service!' , undefined)
          } else if (body.features.length === 0 ) {
               callback('Unable to find location .', undefined)
    
          } else {
                
               callback(undefined, {
                   
                      lat : body.features[0].center[0], 
                      long: body.features[0].center[1],
                      loca: body.features[0].place_name
               }
              
    
                ) 
                  
                          
          }
     })
    }
    
    
    module.exports = geolocation