import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";

export const Permissions = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);
  res.send(await repository.find());
};

export const CreatePermission = async (req: Request, res: Response) => {
  const { name } = req.body;
  const repository = getManager().getRepository(Permission);
  const permission = await repository.save({ name });
  res.status(201).send({
    message: "Create Permission Success",
    data: permission,
  });
};

export const GetPermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);
  res.status(200).send(
    await repository.findOne({
      where: { id: parseInt(req.params.id) },
    })
  );
};

export const UpdatePermission = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const repository = getManager().getRepository(Permission);
    await repository.update(req.params.id, { name });
    const permission = await repository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.status(202).send({
      message: "Update Permission Success",
      data: permission,
    });
  } catch (e) {
    res.status(500).send({ error: e.message})
  }

};

export const DeletePermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);
  await repository.delete(req.params.id);
  res.status(204).send(null);
};
