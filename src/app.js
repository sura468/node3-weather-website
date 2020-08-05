const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

// console.log(__dirname) // prints the directory  
// console.log(__filename) // prints the filename 
// console.log(path.join(__dirname,'../Public')) // this is concat the the provided path names 


//Define paths for Express Config
const app = express()
const publicDirectoryPath = path.join(__dirname,'../Public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
       res.render('index' , {
           title:'Weather App',
           name : 'Sai' 
       })
})  

app.get('/about',(req,res )=>{
      res.render('about', {
          title:'About',
          name:'Sai'
      })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        name:'Sai'
    })

})
// app.get('' , (req,res) => {   // This will not be executed when app.use is defined as it will display the root page
//       res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) =>{
//         res.send([
//             {
//             Name:'SAI',
//             Age:28
//         },{
//             Name: 'Prathap',
//             Age:28 
//         }])
// })



app.get('/Weather', (req,res) =>{
    if(!req.query.address) {
        return res.send({
            error:'You must enter a valid address'
        })
    }

    geolocation(req.query.address,(error,{lat,long,loca} = {} )=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat,long,(error,{Temp,Feels})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                Location:loca,
                Temperature: Temp,
                FeelsLike: Feels
            })
            
        })

    }) 
    
})

app.get('/Products', (req,res) =>{ 
    if(!req.query.search) {
       return res.send({
            error:'You must enter some serch item'
        })

    }
    console.log(req.query)
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res) =>{
    res.render('404', {
        title:'404',
        name:'Sai',
        ErrorMessage:'Help Article not Found'
    })
})


app.get('*',(req,res) =>{
    res.render('404', {
        title: '404',
        name: 'Sai',
        ErrorMessage: 'Page not found'
    })

})

app.listen(3000, () => {
     console.log('Server is Up and Running on Port :3000 ')
})