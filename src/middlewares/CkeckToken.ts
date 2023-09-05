import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
 
const checkToken = (req: Request, res: Response, next: NextFunction) => {
  /**
   * On extrait le token des entêtes de la requête
   */
  const token = req.headers.authorization;
  console.log("Middleware : ", token);
 
  /**
   * Si aucun token n'est présent dans les entêtes
   * on retourne une erreur d'authentification
   */
  if (!token) {
    res
      .status(403)
      .send({ status: "FAILED", message: "Erreur d'authentification" });
    return;
  }
 
  /**
   * On enlève le mot "Bearer " (ajouté pour pouvoir
   * transmettre le token) dans les entêtes de la
   * requête
   */
  const tokenToVerify = token.replace("Bearer ", "");
  try {
    /**
     * On vérifie la validité du token à l'aide
     * de la clé secrète
     */
    jwt.verify(tokenToVerify, process.env.PRIVATEKEY_TOKEN);
  } catch (error) {
    /**
     * Si un erreur est détécté le Token n'est pas
     * correct, on renvoie donc une erreur
     */
    res
      .status(403)
      .send({ status: "FAILED", message: "Erreur d'authentification" });
    return;
  }
 
  /**
   * Si on est arrivé ici, le token est bon on
   * laisse passer la requête !!!
   */
  next();
};
 
export default checkToken;