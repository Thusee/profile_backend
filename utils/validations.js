var admin = require("firebase-admin");

const validateStringChar = (string, minLength) => {
  return string.length < minLength ? true : false;
};

const removeMarkup = (string) => {
  return string;
};

const validateEthnicity = async (id) => {
  if (id) {
    var db = admin.database();
    var ref = db.ref("/ethnicity");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return element.id == id;
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

const validateFigure = async (id) => {
  if (id) {
    var db = admin.database();
    var ref = db.ref("/figure");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return element.id == id;
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

const validateGender = async (id) => {
  if (id) {
    var db = admin.database();
    var ref = db.ref("/gender");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return element.id == id;
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

const validateMaritalStatus = async (id) => {
  if (id) {
    var db = admin.database();
    var ref = db.ref("/marital_status");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return element.id == id;
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

const validateReligon = async (id) => {
  if (id) {
    var db = admin.database();
    var ref = db.ref("/religion");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return element.id == id;
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

const validateLocation = async (city) => {
  if (city) {
    var db = admin.database();
    var ref = db.ref("/cities");
    const snapshot = await ref.once("value");
    const value = snapshot.val();
    let tmp = value.filter((element) => {
      return JSON.stringify(element) === JSON.stringify(city);
    });
    return tmp.length > 0 ? true : false;
  } else {
    return true;
  }
};

module.exports = {
  validateStringChar,
  removeMarkup,
  validateEthnicity,
  validateFigure,
  validateGender,
  validateMaritalStatus,
  validateReligon,
  validateLocation
};