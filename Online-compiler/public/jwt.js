const jwt = require("jsonwebtoken");
const secretKey = "i am zack";

function tokengeneration(req, res, callback) {
  const payload = {
      email: req.body.email,
      password: req.body.password
  };
  console.log(payload);

  const options = {
      expiresIn: '1h'
  };

  jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) {
          console.error('Error creating token:', err);
      }
      console.log('Generated JWT:', token);
      callback(token);
  });
}
function checkthetoken(req, res) { 
    if (req.cookies && req.cookies.token) {
      const token = req.cookies.token;
    //  console.log("Token:", token);
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } else {
      console.log("Token missing");
    }
}
function is_authenticate(req,res)
{
  let tobjc=checkthetoken(req,res);
 // console.log("token data=> " ,tobjc)
 // console.log("request data=>",req.body)
  
  if((req.body.email===tobjc.email))
  {
    return true;
  }
  else 
  {
    return false;
  }
}
function min_authentication(req,res)
{

  if(req.cookies && req.cookies.token && req.cookies.default)
  {
       let tokenemail;
       tokenemail=req.cookies.default;  
       token =checkthetoken(req,res)
       return tokenemail===token.email
  }
  else
  {
     return false;
  }
}
module.exports={
    tokengeneration,
    checkthetoken,
    is_authenticate,
    min_authentication
}

//solve the following error in console