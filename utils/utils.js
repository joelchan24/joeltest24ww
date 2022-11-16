const jwt = require("jsonwebtoken");

// cleaning mongoose response
exports.clearRes = (data) => {
  const { password, createdAt, updatedAt, __v, ...restData } = data;
  return restData;
};
// creating a jsonwebtoken
exports.createJWT = (user) => {
  return jwt
    .sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
    .split(".");
};
