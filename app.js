const express = require("express");
require("dotenv").config(); // require('dotenv').config() ifadesi, dotenv paketini yüklemeyi ve .env dosyasındaki çevresel değişkenleri yükleyerek process.env üzerinden erişilebilir hale getirmeyi sağlar.
const port = process.env.PORT || 5000;
const getMailCotroller = require("./src/controller/mailController");

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/pages/index.html");
});

app.post("/sendMail", getMailCotroller.getMail);

app.listen(port, () => {
  console.log(port, "portunda çalıştı");
});
