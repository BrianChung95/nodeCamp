const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const signup = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  // console.log(user, tokens);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const signin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    // const tokens = await tokenService.generateAuthTokens(user);
    // const { access, refresh } = tokens;
    const { access } = await tokenService.generateAuthTokens(user);
    const accessToken = access;
    const refreshToken = access;
    const data = {
      user,
      tokens: {
        access: accessToken,
        refresh: refreshToken
      }
    };
    res.send({
      error: null,
      data
    })
  } catch (error) {
    res.send({
      error: error.message
    });
  }
  // const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  // console.log(user, tokens);
  // res.send({ user, tokens });
});

module.exports = { signup, signin };
