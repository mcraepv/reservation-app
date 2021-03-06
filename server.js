// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

// Displays table reservations
app.get("/api/tables", function (req, res) {
    var tables = reservations.slice().splice(0, 5);
    return res.json(tables);
});

// Displays waitlist reservations
app.get("/api/waitlist", function (req, res) {
    if (reservations.length <= 5)
        return res.json(false);
    var waitlist = reservations.slice().splice(5);
    return res.json(waitlist);
});

// Create New Reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    console.log(newReservation);

    reservations.push(newReservation);

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})