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
  let data = req.body;
  let names;
  let url;
  let resp;
  if (req.method === "PUT") {
    data="Put: "+data
  }
  if (req.method === "GET") {
    data="GET: "+data
  }
  if (req.method === "POST") {
  
   names=data.title
   url=data.url
   resp="Post: "+data
  }

  res.status(200).json(data.data+"AFter"+resp);
};

export default filecollector;
