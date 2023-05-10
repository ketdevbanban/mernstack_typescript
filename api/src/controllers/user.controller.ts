import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const Users = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(User);
    const users = await repository.find({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        status: true,
        updated_at: true,
        created_at: true,
      },
      relations: { role: true },
      order: {
        id: "ASC", // or 'DESC' for descending order
      },
    });
    res.send(users);
  } catch (error) {
    res.status(404).send("Server Error");
  }
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hasdedpassword = await bcryptjs.hash("123456", 10);
  try {
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
  } catch (error) {
    res.status(404).send("Server Error");
  }
};

export const GetUser = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(User);
    const { password, updated_at, created_at, ...user } =
      await repository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["role", "role.permissions"],
      });
    res.send(user);
  } catch (error) {
    res.status(404).send("Server Error");
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  try {
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
  } catch (e) {
    res.status(404).send("Server Error");
  }
};
export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(User);

    await repository.delete(req.params.id);

    res.status(204).send(null);
  } catch (error) {
    res.status(404).send("Server Error");
  }
};
