const express = require("express");
const cookieparser = require('cookie-parser');
const routes = require("./routes");
const app = express();
const cors = require('cors');
app.use(cookieparser());

app.use(cors({
  origin: process.env.ORIGIN_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000 || process.env.PORT;

app.use("/post", routes.post);
app.use("/user", routes.user);
app.listen(3000, () => console.log("listening on port: " + PORT));
