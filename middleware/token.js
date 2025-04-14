const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader == "undefined") {
    return res.sendStatus(403);
  }

  try {
    const bearerToken = bearerHeader.split(" ")[1];

    const user = jwt.verify(bearerToken, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = {
  verifyToken,
};
