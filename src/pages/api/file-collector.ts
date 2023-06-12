import { type NextApiRequest, type NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: {
      responseLimit: '18mb',
      sizeLimit: '15mb',
    },
  },
}
type Payload = {
  title: string,
          text: string,
          url: string,
}
const filecollector = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body);
  

  const { searchParams } = new URL("Params: "+req.url?.toString()+"")
  res.status(200).json(data);
};

export default filecollector;
