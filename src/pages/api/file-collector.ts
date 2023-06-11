import { type NextApiRequest, type NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: {
      responseLimit: '18mb',
      sizeLimit: '15mb',
    },
  },
}

const filecollector = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchParams } = new URL("Params: "+req.url?.toString()+"")
  res.status(200).json(searchParams+req.body);
};

export default filecollector;
