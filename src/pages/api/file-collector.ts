
import { Form } from '@ts-stack/multiparty';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
   api: {
    bodyParser: false
  }
  },
}

const filecollector = async (req : NextApiRequest, res : NextApiResponse) => {
//   let data = req.body;
//   let names;
//   let url;
//   let resp;
//   if (req.method === "PUT") {
//     data="Put: "+data
//   }
//   if (req.method === "GET") {
//     data="GET: "+data
//   }
//   if (req.method === "POST") {
//   console.log(req.body)
//    names=data.title
//    url=data.url
//    resp="Post: "+data
//   }
// resp=  JSON.parse(req.body)
const form = new Form();

const x= form.parse(req, (err, fields, files) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write('received upload:\n\n');

});

  res.status(200).json(x);
};

export default filecollector;
