import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { User } from "../models/User";

const SECRET = "SALT";

const genereteJWT = (user: User) => {
  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: 900, // 15 min
  });

  return token;
};

const verifyJWT = (req: Request, res: Response, next: any) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(`${token}`, SECRET, function (err: any, decoded: any) {
    if (err)
      return res.status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    res.locals.userId = decoded.id;
    next();
  });
};

export { genereteJWT, verifyJWT };
