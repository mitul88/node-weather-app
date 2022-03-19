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
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write("<h1>The temperture of Dhaka righ now is : " + temp + " degree celcius</h1>");
            res.write("<h4>The weather of Dhaka currently overcast : " + description + "</h4>");
            res.write(`<img src='${iconUrl}' />`);
            res.send();
        })
    })
})



app.listen(3000, ()=> {
    console.log("server is up and running on port 3000")
})