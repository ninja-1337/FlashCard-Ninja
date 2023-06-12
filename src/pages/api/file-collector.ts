
import formidable from 'formidable';

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
   api: {
    bodyParser: false
  }
  },
}

const filecollector = async (req : NextApiRequest, res : NextApiResponse) => {
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
  console.log(req.body)
   names=data.title
   url=data.url
   resp="Post: "+data
  }
  
  res.status(200).json(req.body);
};

export default filecollector;
