const express = require('express');
const https = require('https');
require('dotenv').config();

const app = express();

app.get("/", (req, res)=> {

    const api_key = process.env.api_key;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=${api_key}&units=metric`;
    https.get(url, (response)=> {
        console.log(response.statusCode);

        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            const temp = JSON.stringify(weatherData.main.temp);
            const description = JSON.stringify(weatherData.weather[0].description);
            res.send("The temperture of Dhaka righ now is : " + temp + " degree celcius");
        })
    })
})



app.listen(3000, ()=> {
    console.log("server is up and running on port 3000")
})