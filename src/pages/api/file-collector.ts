
import formidable from 'formidable';
import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {

   api: {
    bodyParser: false

  },
}

const filecollector = async (req : NextRequest, res : NextApiResponse) => {
  // let data = req.body;
  // let names;
  // let url;
  // let resp;
  // if (req.method === "PUT") {
  //   data="Put: "+data
  // }
  // if (req.method === "GET") {
  //   data="GET: "+data
  // }
  // if (req.method === "POST") {
  // console.log(req.body)
  //  names=data.title
  //  url=data.url
  //  resp="Post: "+data
  // }

  const data = await req.formData();
  res.status(200).json(data);
};

export default filecollector;
