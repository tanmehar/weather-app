const express = require("express");

const http = require("http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    let cityName = req.body.cityName;

    const url = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=e1517b1f0d99dd61160a519ee5f338d5"
    http.get(url,function(response){
        response.on("data",function(data){
            let whetherData = JSON.parse(data);
            let temp = whetherData.main.temp;
            let description = whetherData.weather[0].description;
            let icon = whetherData.weather[0].icon;
            let iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Your area whether data is here:</h1><br>it's "+temp+", "+description);
            res.write("<img src = "+iconUrl+">")
        })
    })
})




app.listen(3000,function(){
    console.log("server running in port 3000");
});