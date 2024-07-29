import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/util/mongodb";
import { compare } from "brcypt";
import { serialize } from "cookie";

import { sign } from "jsonwebtoken";

const KEY = process.env.JWT_SECRET_KEY;

const isUserExists = async (db, email) => {
  const user = await db.collection("users").findOne({ email: email });

  if (!user) {
    return user;
  }
  return null;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).send({ error: "email or password is missing" });

    const { db, client } = await connectToDatabase();
    if (client.isConnected()) {
      const userDetail = await isUserExists(db, email);

      if (userDetail) {
        compare(password, userDetail.password, function (err, isMatched) {
          if (isMatched === true) {
            const claim = { id: userDetail._id, email: userDetail.email };
            const token = sign({ user: claim }, KEY, { expiresIn: "1h" });

            res.setHeader(
              "Set-Cookie",
              serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "developement",
                maxAge: 60 * 60 * 24 * 1000,
                sameSite: "strict",
                path: "/",
              })
            );
            res.send({
              message: "success",
              token,
              id: userDetail._id,
              status: 200,
            });
          } else {
            res.status(404).send({ error: "Invalid username or password" });
          }
        });
      } else {
        res.status(404).send({ error: "Invalid username or password" });
      }
    }
  }
}
