import { Request, Response } from "express";

import { User } from "../models/User";
import query from "../database/DB";
import { genereteJWT } from "../helpers/JwtAuth";

class AuthController {
  async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user: User = (await query(
        "SELECT * FROM usuarios WHERE EMAIL = $1 AND PASSWORD = $2",
        [email, password]
      )).rows[0];
  
      if (!user)
        return res.status(401).json({ message: "Invalid login." });
  
      const token = genereteJWT(user);
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(400).json({ message: `Occurred an error: ${error}`, error });
    }
    
  }

  async Logout(req: Request, res: Response) {
    return res.status(200).json({ token: null });
  }
}

export default AuthController;
