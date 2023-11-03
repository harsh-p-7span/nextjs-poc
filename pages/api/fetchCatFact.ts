import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const fetchCatFact = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get("https://catfact.ninja/fact");
  res.status(200).json(response.data);
};

export default fetchCatFact;
