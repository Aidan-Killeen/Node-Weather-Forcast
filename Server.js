
//let request = require('request');
 




const express = require ('express')
const request = require('request');

const app = express()
const port = 3000
const path = require ("path")
let publicPath = path.resolve(__dirname,"public")
app.use(express.static(publicPath))
app.get('/weather/:City', getWeather)

app.get('/pollution/:lat/:long', getPollution)
app.get('/weekly/:lat/:long', getWeekly)


app.listen(port, () => console.log(`Weather app listening on port ${port}!`))

function getWeather(req,res)
{
    //const PRE =  'api.openweathermap.org/data/2.5/weather?q='
    //const TOKEN = '&APPID=3e2d927d4f28b456c6bc662f34350957'
    //let url = PRE + req.params.City + TOKEN
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.City}&units=imperial&appid=${TOKEN}`

    let apiKey = '3e2d927d4f28b456c6bc662f34350957';

    let city = req.params.City;//'Dublin';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    //let url = `http://api.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=5&appid=${apiKey}&units=metric`

    // or this one, as it is limited to one forcast per day
    //let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}&units=metric`

    //this one is best
    //let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    
    
    request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        //console.log('body:', body);
        let weather = JSON.parse(body);
        /*        
        let dados = `Data for ${weather.name}:
        -Temps: ${weather.main.temp}ºC
        -Humidity: ${weather.main.humidity}%`;
        
        console.log(dados);
        */
        res.json(weather);
    }
    });

}

function getWeekly(req, res)
{
    let apiKey = '3e2d927d4f28b456c6bc662f34350957';
    //let city = req.params.City;//'Dublin';
    let lat = req.params.lat;
    let long = req.params.long;
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=currently,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    //let url = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
    request(url, function (err, response, body) {
        if(err){
            console.log('error:', error);
        } else {
            //console.log('body:', body);
            let weather = JSON.parse(body);
            /*        
            let dados = `Data for ${weather.name}:
            -Temps: ${weather.main.temp}ºC
            -Humidity: ${weather.main.humidity}%`;
            
            console.log(dados);
            */
            res.json(weather);
        }
        });
}

function getPollution(req,res)
{

    let apiKey = '3e2d927d4f28b456c6bc662f34350957';
    let lat = req.params.lat;
    let long = req.params.long;
    let url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`;


    
    request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        //console.log('body:', body);
        let pollution = JSON.parse(body);

        res.json(pollution);
    }
    });

}