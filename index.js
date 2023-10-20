const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


//Brand-Shop-Owner
//yVsy5XTLp44fStlX


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Brand-Shop-Owner:yVsy5XTLp44fStlX@cluster0.xyjw3s8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// const database = client.db("BrandShopDB");
// const productCollection = database.collection("haiku");

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const productCollection = client.db("BrandShopDB").collection("product");
        const brandCollection = client.db("BrandsDB").collection("brands");
        const cartCollection = client.db("MyCartDB").collection("carts");

        app.get("/products", async(req,res)=>{
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/brands", async(req,res)=>{
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/products", async(req,res)=>{
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        app.post("/myCart", async(req,res)=>{
            const newProduct = req.body;
            console.log(newProduct);
            const result = await cartCollection.insertOne(newProduct);
            res.send(result);
        })
        app.get("/myCart", async(req,res)=>{
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        


        app.delete("/myCart/:id", async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Brand shop server is not running")
})

app.listen(port, () => {
    console.log("Brand shop server is running cmd");
})