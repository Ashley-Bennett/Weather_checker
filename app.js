const express = require("express")
const path = require("path")
const geocode = require('./src/geocode')
const forecast = require('./src/forecast')

const app = express()
const publicDirectory = path.join(__dirname, "./public")

app.use(express.static(publicDirectory))


const me = {
    Name: "Ash",
    Age: 23
}


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("Please search for an address")
    }

    geocode(req.query.address, (error, response) => {
        if (error) {
            return console.log(error)
        }

        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address,
            })
        })
    })
})

app.get("/about", (req, res) => {
    console.log(req.query.location)
    res.send(me)
})

app.get("/linkedin", (req, res) => {
    res.send("<h1> <a href=https://www.linkedin.com/in/ashley-bennett-7a5296180/> Link</a></h1>")
})


// console.log(__dirname)

app.listen(3000, () => {
    console.log("Listening on port 3000")
})