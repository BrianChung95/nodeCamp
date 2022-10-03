const { tokenService } = require("../services")

const checkJWT = (req, res, next) => {
  const jwt = req.get("Authorization");
  if (jwt === undefined) {
    res.send({
      error: ""
    });
  }
  tokenService.validateToken(jwt)
  .then((response) => {
    if (response.success === true) {
      req.locals = { userId: response.data }
      next();
    } else {
      res.send({
        error: response.error
      })
    }
  }).catch((error) => {
    res.send({
      error: error
    });
  })
}

module.exports = { checkJWT };