var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqtt_handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/turnLightOn", function(req, res) {
  mqttClient.turnLightOn(req.body);
  res.status(200).send("Message sent to mqtt");
});

app.post("/sendData", function(req, res) {
  mqttClient.sendDataToSensor(req.body);
  res.status(200).send("Message sent to mqtt");
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});