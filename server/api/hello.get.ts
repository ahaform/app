import { dbClient } from "../services/db-client";

export default defineEventHandler(async (event) => {

  const { data, error } = await dbClient.from("user").select();

  return {
    data,
    error,
  };
});
