const express = require("express");
const cookieparser = require("cookie-parser");
const routes = require("./routes");
const app = express();
const cors = require("cors");
app.use(cookieparser());

const whitelist = [process.env.ORIGIN_URL, process.env.ORIGIN_URL_2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000 || process.env.PORT;

app.use("/post", routes.post);
app.use("/user", routes.user);
app.listen(PORT, () => console.log("listening on port: " + PORT));
