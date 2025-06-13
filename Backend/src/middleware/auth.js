const jwt = require("jsonwebtoken");
const User = require("../schema/user");

const Auth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    if (!token)
      return res.status(401).json({ message: "token is not valid...." });
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const checkToken = jwt.verify(token, privateKey);
    //console.log(checkToken);
    if (!checkToken)
      return res.status(401).json({ message: "token not verified!!..." });
    const { id } = checkToken;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    req.user = user;
    //console.log(user);

    next();
  } catch (err) {
    console.error("Error: ", err.message);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = Auth;
