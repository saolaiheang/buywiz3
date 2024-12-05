import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/encrypt";
import { TokenPayload } from "../common/types";
import { RoleEnum } from "../utils/enum";
import { v4 as uuidv4 } from 'uuid';


const userModel = new UserModel();

export const register = async (req: Request, res: Response) => {
  const { userName, lastName, password, email, contact } = req.body;
  const id = uuidv4(); // Generate UUID if not provided

  try {
    // Check if the user already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Register the user
    await userModel.register({
      userName, lastName, password, email, contact,
      id,
      role: RoleEnum.USER
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Validate login credentials
    const { isValid, user } = await userModel.validateLogin(email, password);

    if (!isValid || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const tokenPayload: TokenPayload = {
      id: user.id || "",
      role: user.role as RoleEnum
    };
    const token = generateToken(tokenPayload);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
