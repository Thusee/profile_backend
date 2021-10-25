
var validation = require('../utils/validations')
var admin = require("firebase-admin");

const updateProfile = async (req) => {
    let profile = req.body;
  if (
    profile.displayName &&
    profile.realName &&
    profile.birthday &&
    profile.gender &&
    profile.maritalStatus &&
    profile.location &&
    profile.location.lat &&
    profile.location.lon &&
    profile.location.city
  ) {
    const dbObject = {
      displayName: validation.removeMarkup(profile.displayName),
      realName: validation.removeMarkup(profile.realName),
      profilePic: profile.profilePic,
      birthday: profile.birthday ? profile.birthday : "",
      gender: profile.gender,
      ethnicity: profile.ethnicity ? profile.ethnicity : "",
      religion: profile.religion ? profile.religion : "",
      height: parseInt(profile.height) ? parseInt(profile.height) : 0,
      figure: profile.figure ? profile.figure : "",
      maritalStatus: profile.maritalStatus,
      occuapion: validation.removeMarkup(profile.occuapion)
        ? validation.removeMarkup(profile.occuapion)
        : "",
      aboutMe: validation.removeMarkup(profile.aboutMe)
        ? validation.removeMarkup(profile.aboutMe)
        : "",
      location: profile.location,
    };
    if (
      validation.validateStringChar(dbObject.displayName, 256) &&
      validation.validateStringChar(dbObject.realName, 256) &&
      validation.validateStringChar(dbObject.occuapion, 5000) &&
      validation.validateStringChar(dbObject.aboutMe, 256)
    ) {
      if (
        (await validation.validateEthnicity(dbObject.ethnicity)) &&
        (await validation.validateFigure(dbObject.figure)) &&
        (await validation.validateGender(dbObject.gender)) &&
        (await validation.validateMaritalStatus(dbObject.maritalStatus)) &&
        (await validation.validateReligon(dbObject.religion)) &&
        (await validation.validateLocation(dbObject.location))
      ) {
        var db = admin.database();
        const usersRef = db.ref('profile');
        await usersRef.set(dbObject);
        return {
          code: 200,
          status: "success",
          message: "Profile created successfully",
        };
      } else {
        return {
          code: 200,
          status: "failed",
          message: "Please check all the values id",
        };
      }
    } else {
      return {
        code: 400,
        status: "failed",
        message:
          "One or more free data is having more than required charecters",
      };
    }
  } else {
    return{
      code: 400,
      status: "failed",
      message: "Some data missing in the body",
    };
  }
}

const getProfile = async (key) => {
  var db = admin.database();
  var ref = db.ref("/profile");
  const snapshot = await ref.once("value");
  const value = snapshot.val();
  return value
};

module.exports = {
    updateProfile, 
    getProfile
}