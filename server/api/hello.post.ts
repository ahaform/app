import { dbClient } from "../services/db-client";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  const { error, data } = await dbClient.from("user").insert({
    user_name:name,
    email,
    password,
  });

  return {
    error,
    data,
  };
});
