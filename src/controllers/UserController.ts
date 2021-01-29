import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";

const users = [
  { id: 1, name: "nome1", email: "email1@email.com", password: "admin123" },
  { id: 2, name: "nome2", email: "email2@email.com", password: "admin123" },
  { id: 3, name: "nome3", email: "email3@email.com", password: "admin123" },
  { id: 4, name: "nome4", email: "email4@email.com", password: "admin123" },
];

export default {
  signin(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!_.find(users, { email, password })) {
      return response
        .status(401)
        .send({ message: "Email or password not valid" });
    }

    return response.json({
      token: jwt.sign({ email }, process.env.JWT_SECRET || "", {
        expiresIn: "7d",
      }),
    });
  },
  get(request: Request, response: Response) {
    return response.json(users);
  },
};
