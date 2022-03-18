const express = require('express');
const https = require('https');

const app = express();

app.get("/", (req, res)=> {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=527f01b50d782f5c4801ebc04130f077";
    https.get(url, (response)=> {
        console.log(response);
    })

    res.send("Welcome")
})



app.listen(3000, ()=> {
    console.log("server is up and running on port 3000")
})