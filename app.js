const express = require('express');
const https = require('https');
require('dotenv').config();

const app = express();

app.get("/", (req, res)=> {

    const api_key = process.env.api_key;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=${api_key}`;
    https.get(url, (response)=> {
        console.log(response.statusCode);

        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
        })
    })

    res.send("Welcome")
})



app.listen(3000, ()=> {
    console.log("server is up and running on port 3000")
})