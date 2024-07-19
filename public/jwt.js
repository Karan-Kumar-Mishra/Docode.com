const { response } = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "i am zack";
require("dotenv").config();

function clearCookie(req, res) {
  const cookies = Object.keys(req.cookies); //deleteing the all cookie
  cookies.forEach((cookieName) => {
    res.clearCookie(cookieName);
  });
}

function tokengeneration(req, res, callback) {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };
  // console.log(payload);
  const options = {
    expiresIn: 60 * process.env.EXPIRE_TIME,
  };

  jwt.sign(payload, secretKey, options, (err, token) => {
    if (err) {
      console.error("Error creating token:", err);
    }
    // console.log("Generated JWT:", token);
    callback(token);
  });
}
function checkthetoken(req, res) {
  if (req.cookies && req.cookies.token) {
    let decoded;
    const token = req.cookies.token;
    //  console.log("Token:", token);
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (error) {
      clearCookie(req, res);
      console.log("your token is expired !");
      return false;
    }
    return decoded;
  } else {
    console.log("Token missing");
  }
}
function is_authenticate(req, res) {
  if (req.cookies && req.cookies.token && req.cookies.default) {
    let tokenemail;
    tokenemail = req.cookies.default;
    token = checkthetoken(req, res);
    if (token === false) {
      return false;
    }
    return tokenemail === token.email;
  } else {
    return false;
  }
}

module.exports = {
  tokengeneration,
  checkthetoken,
  is_authenticate,
  clearCookie
};


