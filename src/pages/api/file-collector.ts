import { type NextApiRequest, type NextApiResponse } from "next";

const filecollector = async (req: NextApiRequest, res: NextApiResponse) => {
 
  res.status(200).json(req.body);
};

export default filecollector;
