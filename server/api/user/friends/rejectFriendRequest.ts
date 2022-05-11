import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const rejectFriendRequest = async (req: Request | any, res: Response) => {
  if (validateObjectKeys(req.body, ["id"])) {
    await FriendRequest.deleteOne({ from: req.body.id, to: req.id });
    res.json(new ResponseMessage(200));
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default rejectFriendRequest;