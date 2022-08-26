
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());

var mealsObj = require('./MealsItems.json');
var orderObj = require('./OrderItems.json');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/meals', function (req, res){
    res.send(mealsObj);
});

app.get('/orders', function (req, res){
    res.send(orderObj);
});

app.post('/meals',function (req, res){
    const newMeal = req.body;
    newMeal.id = Math.max(...(mealsObj.mealsList.map(meal => meal.id))) + 1;
    newMeal.price = +newMeal.price;
    mealsObj = {...mealsObj, mealsList: [...mealsObj.mealsList, newMeal]};
    res.send(newMeal);
});

app.post('/orders', function (req,res){
    const newOrder = req.body;
    newOrder.orderId = (orderObj.orderItems.length === 0 ? 0 : Math.max(...(orderObj.orderItems.map(order => order.orderId)))) + 1 ;
    orderObj = {...orderObj, orderItems: [...orderObj.orderItems, newOrder]};
    res.send(newOrder);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});