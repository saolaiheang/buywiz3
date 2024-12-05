import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import pool from "../config/data-source";
import { CategoryModel } from "../models/category.model";

const categoryModel = new CategoryModel();

export const addCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const id = uuidv4();

  try {
    await categoryModel.create({id, name, description});
    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
