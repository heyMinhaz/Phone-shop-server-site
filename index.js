const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5001;



app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7vvjepm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

await client.connect();


    const phonesCollection = client.db("phonesDB").collection('phone');
     

app.get("/phones", async (req, res) => {
  const result = await phonesCollection.find().toArray();
  res.send(result); 
});
    
    
    // update
    
app.get("/phones/:_id", async (req, res) => {
  const id = req.params._id;
  const query = {_id: new ObjectId(id) }
  const result = await phonesCollection.findOne(query)
  res.send(result);


});
    
    
    app.put('/phones/:_id', async (req, res) => {
      
      const id = req.params._id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updatePhone = req.body;
      
      const phone =
      
      {
        $set: {
          name: updatePhone.name,
          Price: updatePhone.Price,
          brandname: updatePhone.brandname,
          type: updatePhone.type,
          rating: updatePhone.rating,
          textarea: updatePhone.textarea,
          photourl: updatePhone.photourl,
        },
      };

      const result = await phonesCollection.updateOne(filter, phone, options)
      
      res.send(result);

    })
    
    
    
    app.get("/brand/:name", async (req, res) => {
  const name =req.params.name

      console.log(name);
     
});

    app.post("/phones", async (req, res) => {
      const data = req.body;
     
      const result = await phonesCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    
res.send(`Brand Site`)


})

app.listen(port, () => {
    
console.log(`Server: ${port}`);


})