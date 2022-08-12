
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());

var mealsObj = require('./MealsItems.json');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/Meals', function (req, res){
    res.send(mealsObj);
});

app.post('/Meals',function (req, res){
    const newMeal = req.body;
    newMeal.id = Math.max(...(mealsObj.mealsList.map(meal => meal.id))) + 1;
    newMeal.price = +newMeal.price;
    mealsObj = {...mealsObj, mealsList: [...mealsObj.mealsList, newMeal]};
    res.send(newMeal);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});