import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const Users = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const users = await repository.find();
  res.send(
    users.map((user) => {
      const { password, ...data } = user;
      return data;
    })
  );
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hasdedpassword = await bcryptjs.hash("123456", 10);
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.save({
    ...body,
    password: hasdedpassword,
  });
  res.send(user);
};
