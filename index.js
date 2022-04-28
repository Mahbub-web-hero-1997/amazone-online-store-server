const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// User = emazone
// Pass = hi2Sai5HwcAYyVjs


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqlv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect();
    const serviceCollection = client.db("amazone").collection("service");
    app.get("/service", async (req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })
}
run().catch(console.dir)

app.get("/", (req, res) => {
    res.send('Hi!!!!!')
})

app.listen(port, () => {
    console.log('The Port is Listening');
});