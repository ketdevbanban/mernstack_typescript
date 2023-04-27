import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const Users = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const users = await repository.find({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      updated_at: true,
      created_at: true,
    },
    relations: { role: true },
  });
  res.send(users);
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hasdedpassword = await bcryptjs.hash("123456", 10);
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.save({
    ...body,
    password: hasdedpassword,
    role: {
      id: role_id,
    },
  });
  res.status(201).send({
    message: "Create User Success",
    data: user,
  });
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.findOne({
    where: { id: parseInt(req.params.id) },
  });
  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;

  const repository = getManager().getRepository(User);

  await repository.update(req.params.id, {
    ...body,
    role: {
      id: role_id,
    },
  });

  const { password, ...user } = await repository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    relations: ["role"],
  });

  res.status(202).send(user);
};
export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  await repository.delete(req.params.id);

  res.status(204).send(null);
};
