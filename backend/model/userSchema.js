//10
const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "user name is required"],
      maxLength: [50, "enter name less than 50 character"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "enter valid length"],
      unique: true,
      lowercase: true,
      unique: [true, "already registered"],
    },
    password: {
      type: String,
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    typestamps: true,
  }
);

//22 to encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

//16
userSchema.methods = {
  jwtToken() {
    return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h",
    });
  },
};
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
