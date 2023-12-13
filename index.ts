import { Express, Request, Response } from "express";
const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
dotenv.config();

interface Data {
  id: number;
  nama: string;
  lirik: string;
}

var data: Data[] = [
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

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Specify the directory where your views are located
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    data: data,
  }); // Render the "index.ejs" file in the "views" directory
});
app.get("/search", function (req: Request, res: Response) {
  const searchTerm: any = req.query.term; // Dapatkan input pengguna
  const searchResults = data.filter(
    (item) => item.nama && item.nama.includes(searchTerm || "") // Cek keberadaan item.nama sebelum menggunakan includes
  );
  res.render("index", {
    data: searchResults,
  });
});

app.get("/listen/:id", function (req: Request, res: Response) {
  const searchTerm: number = parseInt(req.params.id); // Dapatkan ID dari URL dan ubah ke tipe numerik jika perlu
  console.log(searchTerm);
  const searchResult = data.find((entry) => entry.id == searchTerm);

  res.render("music", {
    entry: searchResult,
  });
});
app.listen(port, () => {
  console.log(`[app]: app is running at http://localhost:${port}`);
});
