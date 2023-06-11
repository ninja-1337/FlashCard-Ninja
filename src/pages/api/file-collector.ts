import { type NextApiRequest, type NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
}

const filecollector = async (req: NextApiRequest, res: NextApiResponse) => {
 
  res.status(200).json(req.body);
};

export default filecollector;
