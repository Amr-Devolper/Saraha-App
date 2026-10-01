import { userModel } from "../../DB/models/user.model.js";
import { errorRes } from "../../utils/error.handle.js";
import { decodeToken , tokenEnum } from "../../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
export const signupService = async ({
  fullname,
  email,
  password,
  gender,
  phone,
  bio,
  age,
  userName,
}) => {
  // const [isEmailExist , isUserNameExist] = await Promise.all([
  //     userModel.findOne({email}),
  //     userModel.findOne({userName})
  // ])

  const isExist = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (isExist) {
    errorRes({
      msg: `${isExist.email == email ? "Email" : "Username"} already exist`,
      statusCode: 400,
    });
  }

  const user = await userModel.create({
    fullname,
    email,
    password,
    gender,
    phone,
    bio,
    age,
    userName,
  });

  return {
    data: { user },
  };
};

export const loginService = async (identifier, password) => {
  const user = await userModel.findOne({
    $or: [{ email: identifier }, { userName: identifier }],
  });

  if (!user) {
    errorRes({
      msg: "invalid credentials",
      statusCode: 400,
    });
  }

  if (user.password != password) {
    errorRes({
      msg: "invalid credentials",
      statusCode: 400,
    });
  }
  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30M",
    },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7DAYS",
    },
  );

  return {
    data: {
      accessToken,
      refreshToken,
    },
  };
};

export const refreshTokenService = async (authorization) => {
  const { user } = await decodeToken({
    authorization,
    tokenType: tokenEnum.refresh,
  });
  const newAccessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30M",
    },
  );

  return {
    data : {
        accessToken : newAccessToken
    }
  }
};
