"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
dotenv.config();
var data = [
    {
        id: 1,
        nama: "imperfect",
        lirik: "none",
    },
    {
        id: 2,
        nama: "marshmellow",
        lirik: "none",
    },
    {
        id: 3,
        nama: "morning rain",
        lirik: "none",
    },
    {
        id: 4,
        nama: "Sweet Shaved Ice",
        lirik: "none",
    },
    {
        id: 5,
        nama: "donut",
        lirik: "none",
    },
    {
        id: 6,
        nama: "Strawberry Milk",
        lirik: "none",
    },
];
var app = express();
var port = process.env.PORT || 3000;
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Specify the directory where your views are located
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.get("/", function (req, res) {
    res.render("index", {
        data: data,
    }); // Render the "index.ejs" file in the "views" directory
});
app.get("/search", function (req, res) {
    var searchTerm = req.query.term; // Dapatkan input pengguna
    var searchResults = data.filter(function (item) { return item.nama && item.nama.includes(searchTerm || ""); } // Cek keberadaan item.nama sebelum menggunakan includes
    );
    res.render("index", {
        data: searchResults,
    });
});
app.get("/listen/:id", function (req, res) {
    var searchTerm = parseInt(req.params.id); // Dapatkan ID dari URL dan ubah ke tipe numerik jika perlu
    console.log(searchTerm);
    var searchResult = data.find(function (entry) { return entry.id == searchTerm; });
    res.render("music", {
        entry: searchResult,
    });
});
app.listen(port, function () {
    console.log("[app]: app is running at http://localhost:".concat(port));
});
