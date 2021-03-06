import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import Workspace from "../../models/database/workspace";
import ResponseError from "../../models/responseError";
// Utils
import { validateObjectKeys } from "../../utils";

const fetchWorkspace = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const workspace = await Workspace.findOne({
    _id: req.query.id,
    users: {
      $in: [req.id],
    },
  });

  res.json(
    new ResponseMessage(200, {
      workspace: new ResponseWorkspace(workspace).getWorkspace(),
    })
  );
};

export default fetchWorkspace;
