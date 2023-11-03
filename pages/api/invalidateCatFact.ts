import createRedisInstance from "@/lib/redis";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const invalidateCatFact = async (req: NextApiRequest, res: NextApiResponse) => {
  const redis = createRedisInstance();

  await redis.set("catFact", "");

  res.status(200).json({
    message: "Cache invalidated successfully.",
  });
};

export default invalidateCatFact;
