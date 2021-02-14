import { json, Request, Response } from "express";

import { User } from "../models/User";
import query from "../database/DB";

class UsersController {
  async Index(req: Request, res: Response) {
    try {
      const result = await query("SELECT * FROM usuarios ORDER BY ID");

      return res.status(200).json(result.rows);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Occurred an error: ${error}`, error });
    }
  }

  async Show(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user: User = (
        await query("SELECT * FROM usuarios WHERE ID = $1", [id])
      ).rows[0];

      if (!user.id)
        return res
          .status(404)
          .json({ message: `User with id: ${id} not found.` });

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Occurred an error: ${error}`, error });
    }
  }

  async Create(req: Request, res: Response) {
    const { email, password, name } = req.body;

    try {
      const result = await query(
        "INSERT INTO usuarios (EMAIL, PASSWORD, NAME) VALUES ($1, $2, $3)",
        [email, password, name]
      );

      if (result.rowCount === 0)
        return res
          .status(400)
          .json({ message: `An error was occurred, try again later.` });

      return res.status(200).json({ message: "User has been created successfully." });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Occurred an error: ${error}`, error });
    }
  }

  async Update(req: Request, res: Response) {
    const id = req.params.id;

    try {
      let queryText = "UPDATE usuarios SET ";

      let setParams: string[] = [];
      let valueParams: any[] = [];
      Object.keys(req.body).forEach(function (key, i) {
        setParams.push(`${key} = $${i + 1}`);
        valueParams.push(req.body[key]);
      });

      queryText += `${setParams.join(", ")} WHERE ID = ${id}`;

      const result = await query(queryText, valueParams);

      if (result.rowCount === 0)
        return res
          .status(400)
          .json({ message: `An error was occurred, try again later.` });

      return res.status(200).json({message: `User has been updated successfully.`});
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Occurred an error: ${error}`, error });
    }
  }

  async Delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const result = await query(`DELETE FROM usuarios WHERE ID = $1`, [id]);

      if (result.rowCount === 0)
        return res
          .status(404)
          .json({ message: `User with id: ${id} not found.` });

      return res.status(200).json(`User has been removed successfully.`);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Occurred an error: ${error}`, error });
    }
  }
}

export default UsersController;
