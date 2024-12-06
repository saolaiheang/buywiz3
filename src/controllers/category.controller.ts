import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { CategoryModel } from "../models/category.model";


export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const id = uuidv4();

  const categoryModel = new CategoryModel({id, name, description});

  try {
    await categoryModel.create();
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
