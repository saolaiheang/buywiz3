import pool from "../config/data-source";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CategoryModel {
  // Create a new category
  async create(category: Category): Promise<void> {
    const query = `
      INSERT INTO category (id, name, description)
      VALUES (?, ?, ?)
    `;
    const values = [category.id, category.name, category.description || null];
    await pool.execute(query, values);
  }

  // Find all categories
  async findAll(): Promise<Category[]> {
    const query = `
      SELECT id, name, description, createdAt, updatedAt FROM category
    `;
    const [rows]: any = await pool.execute(query);
    return rows;
  }

  // Find a category by ID
  async findById(id: number): Promise<Category | null> {
    const query = `
      SELECT id, name, description, createdAt, updatedAt
      FROM category
      WHERE id = ?
    `;
    const [rows]: any = await pool.execute(query, [id]);
    return rows.length ? rows[0] : null;
  }

  // Update a category
  async update(id: number, category: Partial<Category>): Promise<number> {
    const query = `
      UPDATE category
      SET name = ?, description = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const values = [category.name, category.description || null, id];
    const [result]: any = await pool.execute(query, values);
    return result.affectedRows;
  }

  // Delete a category
  async delete(id: number): Promise<number> {
    const query = `
      DELETE FROM category WHERE id = ?
    `;
    const [result]: any = await pool.execute(query, [id]);
    return result.affectedRows;
  }
}