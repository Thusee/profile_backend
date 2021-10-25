var admin = require("firebase-admin");

const searchCity = async (key) => {
  var db = admin.database();
  var ref = db.ref("/cities");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value.filter(element => {
      return element.city.includes(key)
  })
};

module.exports = {
  searchCity,
};
