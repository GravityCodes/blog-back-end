const express = require("express");
const cookieparser = require("cookie-parser");
const routes = require("./routes");
const app = express();
const cors = require("cors");


app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
    credentials: true,
  }),
);


app.use("/post", routes.post);
app.use("/user", routes.user);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("listening on port: " + PORT));
