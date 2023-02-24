import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// Services
import {
  validateObjectKeys,
  ResponseMessage,
} from "../../../../../services/helper";
// Models
import { Project } from "./model";

export const create = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["name", "settings"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const structure = Object.assign({}, req.body, {
    creator: req.data.id,
    private: true,
    users: [req.data.id],
  });

  const projects = await new Project(structure).save();

  res.status(200).json(ResponseMessage.SUCCESS({ projects }));
};

export const fetch = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    const projects = await Project.find({
      $or: [{ creator: req.data.id }, { users: req.data.id }],
    });

    res.status(200).json(ResponseMessage.SUCCESS({ projects }));
    return;
  }

  const projects = await Project.findOne({
    _id: req.query.id,
    creator: req.data.id,
  });

  res.status(200).json(ResponseMessage.SUCCESS({ projects }));
};

export const update = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const projects = await Project.findOneAndUpdate(
    {
      _id: req.query.id,
      creator: req.data.id,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(ResponseMessage.SUCCESS({ projects }));
};

export const remove = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const removed = await Project.deleteOne({
    _id: req.query.id,
    creator: req.data.id,
  });

  if (!removed.acknowledged) {
    res.status(200).json(ResponseMessage.NOT_FOUND());
  }

  res.status(200).json(ResponseMessage.SUCCESS());
};

export const invite = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id", "path"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const project = await Project.findOne({
    _id: req.query.id,
    creator: req.data.id,
  });

  if (!project) {
    res.status(200).json(ResponseMessage.NOT_FOUND());
    return;
  }

  const hash = await bcrypt.hash(req.query.id as string, 10);

  const invite =
    req.protocol + "://" + req.get("host") + req.query.path + "/" + hash;

  res.status(200).json(ResponseMessage.SUCCESS({ invite }));
};

export default { create, fetch, update, remove, invite };
