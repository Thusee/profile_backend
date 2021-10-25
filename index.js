var express = require("express");
var app = express();
var admin = require("firebase-admin");
//var firebaseConfig = require("./Keys/keys");
var search = require("./routers/search");
var info = require("./routers/info");
var profile = require("./routers/profile")

var serviceAccount = require("./keys/profile-1520e-firebase-adminsdk-5ilbd-4098006812.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://profile-1520e-default-rtdb.firebaseio.com"
  });
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server running on port 3000");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, revplus-authorization"
  );
  next();
});

app.get("/profile", async (req, res, next) => {
  console.log("profile")
  const response = await profile.getProfile();
  res.json({
    code: 200,
    message: "data feteched successfully",
    data: response
  })
});

app.post("/searchCity", async (req, res, next) => {
  let searchKey = req.body.searchKey;
  if (searchKey) {
    let cities = await search.searchCity(searchKey);
    res.json({
      code: 200,
      status: "success",
      message: "Cities found",
      data: cities.length > 0 ? cities : [],
    });
  } else {
    res.json({
      code: 400,
      status: "failed",
      message: "Search key is missing",
    });
  }
});

app.get("/getValues", async (req, res, next) => {
  let userInfo = await info.getInfo();
  if (userInfo) {
    res.json({
      code: 200,
      status: "success",
      message: "Details found",
      data: userInfo,
    });
  } else {
    res.json({
      code: 400,
      status: "failed",
      message: "Somehthing went wrong when fetch the data",
    });
  }
});

app.post("/addProfile", async (req, res, next) => {
   const response = await profile.updateProfile(req);
   res.json(response)
});
