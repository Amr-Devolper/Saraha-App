import jwt from "jsonwebtoken";
import { userModel } from "../DB/models/user.model.js";
import { errorRes } from "../utils/error.handle.js";

export const tokenEnum = {
  access: "access",
  refresh: "refresh",
};

export const auth = async (req, res, next) => {
  const { user } = await decodeToken({
    authorization: req.headers.authorization,
  });

  req.user = user;
  next();
};

export const decodeToken = async ({
  authorization,
  tokenType = tokenEnum.access,
}) => {

  if (!authorization || !authorization.startsWith("Bearer")) {
    errorRes({
      msg: "in-valid token",
      statusCode: 401,
    });
  }

  const token = authorization.split(" ")[1];

  let payload;
  try {
    payload = jwt.verify(
      token,
      tokenType == tokenEnum.access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    errorRes({
      msg:
        error.name == "TokenExpiredError" ? "token expired" : "in-valid token",
      statusCode: 401,
    });
  }

  const user = await userModel.findById(payload._id);


  if (!user) {
    errorRes({
      msg: "userNotFound",
      statusCode: 404,
    });
  }

  // if(!user.confirmedAt){
  //     errorRes({
  //         msg: "please confirm your email",
  //         statusCode : 401
  //     })
  // }

  return {
    user,
  };
};
