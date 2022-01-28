const express = require('express');
const { MongoClient, Db } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const cors=require('cors')
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        console.log("database connected successfully");

        const database=client.db("my-travel-blog");
        const blogCollection=database.collection("blog");

        app.get('/blogs',async(req,res)=>{
          const cursor=blogCollection.find({});
          const blogs=await cursor.toArray();
          res.send(blogs)
        })    
     
    } 
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('wellcome to travel app!')
})

app.listen(port, () => {
  console.log(` my travel app listening at Port:${port}`)
})