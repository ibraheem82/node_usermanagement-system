const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
// * Parsing middleware
// * Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * Parse application/json
app.use(bodyParser.json());

// * static files setting.
app.use(express.static("public"));

// * Templating engine setting
// app.engine("hbs", exphbs({ extname: ".hbs" }));
// app.set("view engine", "hbs");
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));

// app.set("view engine", "hbs");
// app.set("views", "./views");
app.set("view engine", "hbs");

// * Connection pool goes here.
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// connect to the database

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`Connection as ID ${connection.threadId}`);
});
// * Router
app.get("", (req, res) => {
  res.render("home");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
