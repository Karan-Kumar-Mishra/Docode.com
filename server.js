const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");
const { Server } = require("socket.io");
const ec = require("./emailcheck.js");
const db = require("./database/db.js");
const cookieParser = require("cookie-parser");
const jwt = require("./public/jwt.js");
const { JsonWebTokenError } = require("jsonwebtoken");

require("dotenv").config();

db.connectdb();
db.makemodel();
const server = app.listen(80, () => {
  console.log("Server is running  on 127.0.0.1..");
});
const io = new Server(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

let code;
let fileextension;
let language;
let command = "Default command ";
let filename;
let errorMessage;
let output = "Empty";


io.on("connection", (socket) => {
  socket.on("fetch-code", (text) => {
    const jsonObject = JSON.parse(text);
    code = jsonObject.code;
    language = jsonObject.lang;
    compile_code();
    fs.writeFileSync(`Code/code${fileextension}`, code);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        errorMessage = `${error.message}\n${stderr}`;
        console.error("Error:", errorMessage);
        socket.emit("error-message", errorMessage);
        return;
      }
      output = stdout;
      socket.emit("final-result", stdout);
    });
  });
});

function compile_code() {
  switch (language) {
    case "c":
      fileextension = ".c";
      filename = `Code/code${fileextension}`;
      break;
    case "cpp":
      fileextension = ".cpp";
      filename = `Code/code${fileextension}`;
      break;
    case "python":
      fileextension = ".py";
      filename = `Code/code${fileextension}`;
      break;
    case "nodejs":
      fileextension = ".js";
      filename = `Code/code${fileextension}`;
      break;
    default:
      fileextension = ".txt";
      break;
  }
  switch (language) {
    case "c":
      command = `clear && c++ ${filename} -o coutput && ./coutput `;
      break;
    case "cpp":
      command = `clear && c++ ${filename} -o coutput && ./coutput `;
      break;
    case "python":
      command = `clear && python ${filename} `;
      break;
    case "nodejs":
      command = `clear && node ${filename} `;
      break;
  }
}
app.get("/", (req, res) => {
  if (jwt.is_authenticate(req, res)) {
    res.redirect("/app");
  }
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/singup", (req, res) => {
  res.sendFile(__dirname + "/public/SignUp.html");
});

app.post("/logout", (req, res) => {
  jwt.clearCookie(req, res);
  console.log("logout request ..");
  res.send("/");
});
app.get("/about", (req, res) => {
  if (jwt.is_authenticate(req, res)) {
    res.sendFile(__dirname + "/public/About.html");
  } else {
    res.redirect("/singup");
  }
});

app.post("/newuser", (req, res) => {
  jwt.tokengeneration(req, res);
  db.insertUser(req.body);
  res.redirect("/app");
});
app.get("/api", (req, res) => {
  if (jwt.is_authenticate(req, res)) {
    res.sendFile(__dirname + "/public/api.html");
  } else {
    res.redirect("/");
  }
});

app.post("/authentication", (req, res) => {
  if (req.body.email && req.body.password) {
    ec.email_chick(req.body.email).then((ans) => {
      console.log("verfy the email=>", ans);
      if (ans !== "Invalid") {
        db.finduser(req.body)
          .then((ans) => {
            if (ans) {
              if (req.cookies && req.cookies.token) {
                if (jwt.is_authenticate(req, res)) {
                  res.redirect("/app");
                } else {
                  res.redirect("/");
                }
              } else {
                jwt.tokengeneration(req, res, (token) => {
                  res.cookie("token", token, { httpOnly: true });
                  res.cookie("default", req.body.email, { httpOnly: true });
                  res.redirect("/app");
                });
              }
            } else {
              res.redirect("/app");
            }
          })
          .catch((err) => {
            console.log("error in find the user !");
          });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

app.get("/app", (req, res) => {
  if (jwt.is_authenticate(req, res)) {
    res.sendFile(__dirname + "/public/app.html");
  } else {
    res.redirect("/");
  }
});

app.post("/api/compile", (req, res) => {
  let obj = req.body;
  code = obj.code;
  language = obj.language;
  let status = "Code successfully Compile";
  compile_code();
  let result;
  fs.writeFileSync(`Code/code${fileextension}`, code);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      errorMessage = `${error.message}\n${stderr}`;
      result = stderr;
      status = "Code have error";
    }
    result = stdout;
    const sanitizedOutput = result.trim();
    res.json({
      status: status,
      output: sanitizedOutput,
    });
  });
});
