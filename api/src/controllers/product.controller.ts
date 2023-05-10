import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entity/product.entity";

export const Products = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);
    const products = await repository.find({
      order: {
        id: "ASC",
      },
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);
    const product = await repository.save(req.body);
    res.status(201).send(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

export const GetProduct = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);
    res
      .status(200)
      .send(
        await repository.findOne({ where: { id: parseInt(req.params.id) } })
      );
  } catch (e) {
    res.status(404).send("Server Error");
  }
};

export const UpdateProduct = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);
    await repository.update(req.params.id, req.body);
    res
      .status(200)
      .send(
        await repository.findOne({ where: { id: parseInt(req.params.id) } })
      );
  } catch (e) {
    res.status(404).send("Server Error");
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);
    await repository.delete(req.params.id);
    res.status(204).send(null);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

