// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://api.first.org/data/v1/countries");
    res.status(200).json({ country: response.data.data });
  } catch (error) {
    res.status(404).json({ message: "Error in API " });
  }
}
