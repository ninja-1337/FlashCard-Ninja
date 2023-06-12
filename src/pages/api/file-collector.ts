
import formidable from 'formidable';
import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {

   api: {
    bodyParser: false

  },
}

const filecollector = async (req : NextApiRequest, res : NextApiResponse) => {
  const data = "none Data"
  const form = formidable({})
  form.parse(req, (err, fields, files) => {

    res.status(200).json(fields);
  });

  
  let resp;
  if (req.method === "PUT") {
  
  }
  if (req.method === "GET") {

  }
  if (req.method === "POST") {
  console.log(req)

   resp=data
  }

  res.status(200).json(data);
};

export default filecollector;
