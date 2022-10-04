const { tokenService } = require("../services")

const checkJWT = (req, res, next) => {
  const jwt = req.get("Authorization");
  if (jwt === undefined) {
    res.send({
      error: "JWT was undefined"
    });
  }
  tokenService.validateToken(jwt)
  .then((response) => {
    req.locals = { userId: response.user };
    next();
  }).catch((error) => {
    res.send({
      error: error
    });
  })
}

module.exports = { checkJWT };