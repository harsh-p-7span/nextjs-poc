import createRedisInstance from "@/lib/redis";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const updateCatFact = async (req: NextApiRequest, res: NextApiResponse) => {
  const redis = createRedisInstance();

  const catData = await axios.get("https://catfact.ninja/fact");

  await redis.set("catFact", JSON.stringify(catData.data));

  redis.quit();
  return res.status(200).json({
    message: "Changed data successfully.",
  });
};

export default updateCatFact;
