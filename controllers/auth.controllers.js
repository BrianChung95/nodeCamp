const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth.helpers");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  //VALIDATION
  //check if name is empty
  if (!name) return res.status(400).send("Name is required");

  //check if password is empty
  if (!password) return res.status(400).send("Password is required");

  //check if password is longer than 6
  if (password.length < 6)
    return res.status(400).send("Password should be longer than 6 digits");

  //check if email has been taken
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email is taken");

  //hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    console.log("registered user => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console("signup failed =>", err);
    return res.status(400).send("Error");
  }
};

module.exports = { signup };
