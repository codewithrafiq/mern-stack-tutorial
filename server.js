const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

const uri = "mongodb+srv://codewithrafiq:12344321@demoproject.pxp9n8y.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


app.get("/mongodb", async(req, res) => {

    await client.connect();
    const db = client.db("testdb")
    const collection = db.collection("crud")
    
    const crud_data = await collection.find({}).toArray()

    console.log("Crud_data---->", crud_data);
    
    res.json(crud_data)

})




app.get("/", (req, res) => {
    res.json({
        "message": "Hello World"
    })
})


app.get("/home", (req, res) => {
    res.send("Hello World I am Home Route")
 })

app.listen(3000, () => {
    console.log(
        "Server is running on localhost:3000"
    );
})