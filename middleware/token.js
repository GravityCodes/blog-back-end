const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (typeof token == "undefined") {
    return res.sendStatus(403);
  }

  try {

    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = {
  verifyToken,
};
