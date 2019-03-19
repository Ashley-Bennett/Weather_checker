const express = require("express")
const path = require("path")
const geocode = require('./src/geocode')
const forecast = require('./src/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "./public")

app.use(express.static(publicDirectory))



app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("Please search for an address")
    }

    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error,
            })
        }

        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error: error,
                })
            }

            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address,
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})