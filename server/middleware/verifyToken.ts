import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../models/responseMessage";

const verifyToken = (req: Request | any, res: Response, next: NextFunction) => {
  if (!req.headers) {
    res.json(new ResponseMessage(403));
    return;
  }

  const token: string = req.headers["x-auth-token"];

  if (!token) {
    res.json(new ResponseMessage(403));
    return;
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, data: any) => {
      if (err) {
        res.json(new ResponseMessage(403));
      } else {
        req.id = data.id;
        req.code = data.code;
        next();
      }
    }
  );
};

export default verifyToken;
