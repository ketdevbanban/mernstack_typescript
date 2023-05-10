import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import { sign, verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import bcryptjs from "bcryptjs";
import { User } from "../entity/user.entity";
// Registser Function
export const Register = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = RegisterValidation.validate(body);
  if (error) {
    return res.status(400).send(error.details);
  }
  if (body.password !== body.password_confirm) {
    return res.status(400).send({
      message: "Password's do not match",
    });
  }
  try {
    const repository = getManager().getRepository(User);

    const { first_name, last_name, email, role_id } = body;
    const hashed_password = await bcryptjs.hash(body.password, 10);
    const { password, ...user } = await repository.save({
      first_name,
      last_name,
      email,
      password: hashed_password,
      role: {
        id: role_id,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send({
      message: "invalid credentials!",
    });
  }
};
// Login Function
export const Login = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({
        message: "invalid credentials!",
      });
    }
    if (!(await bcryptjs.compare(req.body.password, user.password))) {
      return res.status(404).send({
        message: "invalid credentials!",
      });
    }

    if (!user.status) {
      // check if user is disabled
      return res.status(200).send({
        message: "User ຂອງທ່ານຖືກລ໋ອກ ກະລຸນາຕິດຕໍ່ຜູ້ເບີ່ງແຍງລະບົບ",
      });
    }

    const token = sign(
      {
        id: user.id,
        role: user.role.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.SECRET_KEY
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1day
    });
    res.status(200).send("ເຂົ້າສູ່ລະບົບສຳເລັດ");
  } catch (error) {
    res.status(400).send("server Error!!");
  }
};
// Authentication Function
export const AuthenticatedUser = async (req: Request, res: Response) => {
  const { password, ...user } = req["user"];
  res.send(user);
};
//Logout Function
export const Logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send("ອອກຈາກລະບົບແລ້ວ");
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const user = req["user"];
  const repository = getManager().getRepository(User);
  await repository.update(user.id, req.body);
  const { password, ...data } = await repository.findOne({
    where: { id: user.id },
  });
  res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
  const user = req["user"];

  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({
      message: "Password's do not match",
    });
  }

  const repository = getManager().getRepository(User);

  await repository.update(user.id, {
    password: await bcryptjs.hash(req.body.password, 10),
  });
  const { password, ...data } = user;
  res.send(data);
};

export const ChangeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const repository = getManager().getRepository(User);

    res.status(200).json(await repository.update(id, { status }));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
