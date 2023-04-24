import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity/role.entity";

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  res.send(await repository.find());
};

export const CreateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  const repository = getManager().getRepository(Role);
  const role = await repository.save({
    name,
    permissions: permissions.map((id) => ({ id })),
  });
  res.send(role);
};

export const GetRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  res.send(
    await repository.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      relations: ["permissions"],
    })
  );
};
