var admin = require("firebase-admin");

const getInfo = async () => {
  return {
    ethnicity: await getCity(),
    figure: await getFigure(),
    gender: await getGender(),
    maritalStatus: await getMaritalStatus(),
    religion: await getReligon(),
  };
};

const getCity = async () => {
  var db = admin.database();
  var ref = db.ref("/ethnicity");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value;
};

const getFigure = async () => {
  var db = admin.database();
  var ref = db.ref("/figure");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value;
};

const getGender = async () => {
  var db = admin.database();
  var ref = db.ref("/gender");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value;
};

const getMaritalStatus = async () => {
  var db = admin.database();
  var ref = db.ref("/marital_status");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value;
};

const getReligon = async () => {
  var db = admin.database();
  var ref = db.ref("/religion");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value;
};

module.exports = {
  getInfo,
};
