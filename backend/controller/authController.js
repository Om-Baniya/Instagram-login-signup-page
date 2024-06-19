const userModel = require("../model/userSchema");

const emailValidator = require("email-validator"); //14

const bcrypt = require("bcrypt");

//4
const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  //12
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  //13
  if (!emailValidator.validate(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm password doesn't match",
    });
  }

  try {
    const userInfo = new userModel(req.body); //11

    const result = await userInfo.save(); //11

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (e) {
    //12
    if (e.code == 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exist with provided email id",
      });
    }
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "every field is mandatory",
    });
  }
  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // to compare encrypted passwords
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //17
    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//21

const logout = (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "succesfully logged Out",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

//5
module.exports = {
  signup,
  signin,
  getUser,
  logout,
};
