import createRedisInstance from "@/lib/redis";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const fetchCatFact = async (req: NextApiRequest, res: NextApiResponse) => {
  const redis = createRedisInstance();

  const cachedData = await redis.get("catFact");

  if (!cachedData) {
    const catData = await axios.get("https://catfact.ninja/fact");

    await redis.set("catFact", JSON.stringify(catData.data));

    redis.quit();
    return res.status(200).json({
      catData: catData.data,
      message: "This is API data.",
    });
  }

  return res.status(200).json({
    catData: JSON.parse(cachedData),
    message: "This is cached data.",
  });
};

export default fetchCatFact;
