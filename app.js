const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res)=> {
    
    const api_key = process.env.api_key;
    const query = req.body.cityName;
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api_key}&units=${unit}`;
    https.get(url, (response)=> {
    console.log(response.statusCode);

        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>The temperture of ${query} righ now is : ${temp} degree celcius</h1>`);
            res.write(`<h4>The weather of ${query} currently overcast :  ${description}</h4>`);
            res.write(`<img src='${iconUrl}' />`);
            res.send();
        })
    })
})




app.listen(3000, ()=> {
    console.log("server is up and running on port 3000")
})