const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch')
const { api_key } = require('./mockAPI.js')

const data = {}

const app = express()

app.use(cors())

app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 8081
app.listen(port, function () {
    console.log(`app listening on ${port}`)
})

// send api response to client
app.get('/api-response', function (req, res) {
    console.log('client requesting data from server: ', data)
    res.send(data)
})

// handle user input from client then make a fetch call to external api
app.post('/api-call', (req, res) => {

    console.log('post request recieved', req.body)

    const weatherbitKey = process.env.weatherbit_key

    const currentDate = new Date()
    // add 1 week to current date
    currentDate.setDate(currentDate.getDate() + 7)
    const userDate = new Date(req.body.date)

    let startDate = new Date(userDate)
    startDate.setFullYear(startDate.getFullYear() - 1)
    startDate = startDate.getFullYear() + '-' + startDate.getMonth() + '-' + startDate.getDate()
    startDate = `&start_date=${startDate}`
    
    let endDate = new Date(userDate)
    endDate.setDate(endDate.getDate() + 1)
    endDate.setFullYear(endDate.getFullYear() - 1)
    endDate = endDate.getFullYear() + '-' + endDate.getMonth() + '-' + endDate.getDate()
    endDate = `&end_date=${endDate}`
    
    let lat = `&lat=${data.lat}`
    let lng = `&lon=${data.lng}`
        

    // build geoname url
    const string1 = 'http://api.geonames.org/searchJSON?q='
    const string2 = '&maxRows=1'
    const geoname_apiKey = `&username=${process.env.geonames_key}`
    const geoname_url = string1 + req.body.city + string2 + geoname_apiKey

    // build pixabay url
    let city = `&q=${req.body.city}`
    const imageCount = '&per_page=3'
    const category = '&category=places&image_type=photo'
    const pixabay_url = `https://pixabay.com/api/?key=${process.env.pixabay_key}${city}${category}${imageCount}`

    const getGeoLocation = async (url) => {
        try {
            let geoData = await fetch(url)
            let res = await geoData.json()
            data.countryName = res.geonames[0].countryName
            data.lng = res.geonames[0].lng
            data.lat = res.geonames[0].lat
            getWeatherData()

        } catch (error) {
            console.log('error: ', error)
        }
    }
    const getWeatherData = async () => {

        if(userDate <= currentDate) {
            console.log('user date is within a week, getting weather for user date')
    
            const weatherbit_url_current = `https://api.weatherbit.io/v2.0/forecast/daily?days=7${lat}${lng}&key=${weatherbitKey}`

            try{
                let weatherData = await fetch(weatherbit_url_current)
                let res = await weatherData.json()
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].datetime === req.body.date) {
                        data.temp = res.data[i].temp
                        data.weatherDetails = res.data[i].weather.description
                        break
                    }
                }
                getImage()
            } catch (error) {
                console.log('error: ', error)
                }
        } else 
            {
            console.log('user date is NOT less than current date, getting predicted weather')
    
            const weatherbit_url_historical = `https://api.weatherbit.io/v2.0/history/daily?${lat}${lng}${startDate}${endDate}&key=${weatherbitKey}`

            try {
                let weatherData = await fetch(weatherbit_url_historical)
                let res = await weatherData.json()
                data.temp = res.data[0].temp
                data.weatherDetails = 'Predicted temperate based on previous year'
                getImage()
            } catch (error) {
                console.log('error: ', error)
                }
            }
    }

    const getImage = async () => {
        try {
            const image = await fetch(pixabay_url)
            const res = await image.json()
            data.imageURL = res.hits[0].webformatURL
        } catch (error) {
            console.log('error: ', error)
        }
    }

    getGeoLocation(geoname_url)

})
