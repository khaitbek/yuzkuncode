"use server"; // don't forget to add this!

import { z } from "zod";
import { action } from "./todo";

// This schema is used to validate input from client.
const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(100),
});

export const loginUser = action(schema, async ({ username, password }) => {
  if (username === "johndoe" && password === "123456") {
    return {
      success: "Successfully logged in",
    };
  }

  return { failure: "Incorrect credentials" };
});
