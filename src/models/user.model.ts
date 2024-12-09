import { encryptPassword, comparePassword } from "../utils/encrypt";
import pool from "../config/data-source";

export interface User {
  id: string;
  userName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  contact?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {
  private user?: User

  constructor(user?: User) {
    this.user = user
  }


  // Register a new user
  async register(): Promise<void> {
    if (!this.user) {
      throw new Error("User data is required to create a new user.");
    }
    const hashPassword = encryptPassword(this.user.password);
    const query = `
      INSERT INTO users (id, userName, lastName, password, email, contact)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [this.user.id, this.user.userName, this.user.lastName, hashPassword, this.user.email, this.user.contact || null];

    await pool.execute(query, values);
  }

  // Check if a user exists by email
  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows]: any = await pool.execute(query, [email]);

    return rows.length > 0 ? rows[0] : null;
  }

  // Validate user login credentials
  async validateLogin(email: string, password: string): Promise<{ isValid: boolean; user?: User }> {
    const user = await this.findByEmail(email);

    if (!user) return { isValid: false };

    const isPasswordValid = comparePassword(user.password, password);
    return { isValid: isPasswordValid, user: isPasswordValid ? user : undefined };
  }
}
