import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const {method} = req;
  
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id){
      res.json(await Product.findOne({_id:req.query.id}));
    } else{
      res.json(await Product.find());
    }
    
  }

  if (method === 'POST'){
    const {title,serial,description,condition,region,price,quantity,images} = req.body;

    const productDoc = await Product.create({
     title,serial,description,condition,region,price,quantity,images
    });

   res.json(productDoc);
  }

  if (method === 'PUT'){
    const {title,serial,description,condition,region,price,quantity,_id} = req.body;
    await Product.updateOne({_id}, {title,serial,description,condition,region,price,quantity});
    res.json(true);
  }

  if (method === "DELETE"){
    if (req.query?.id){
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }

}
