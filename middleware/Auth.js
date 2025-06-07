const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (token !== "J_Pencil") {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // The below code is the logic JWT Token Verification

    // try {
    //   const decoded = jwt.verify(token, SECRET_KEY);
    // next();
    // } catch (error) {
    //   return res.status(401).json({ msg: "Unauthorized" });
    // }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = Auth;
