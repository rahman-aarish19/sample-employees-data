
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "";
const fs = require('fs');

async function readFile() {
    return new Promise(async (resolve, reject) => {
        const filePath = "./MOCK_DATA_EMPLOYEES.json";
        const stream = await fs.createReadStream(filePath, "utf-8");
        let response = "";

        stream.on('data', data => {
            response += data;
        });
        stream.on('end', () => {
            resolve(response);
        });
        stream.on('error', err => {
            console.log(err);
            reject(err);
        });
    });
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        console.log(`Start Time: ${Date.now()}`);
        await client.connect();
        // Send a ping to confirm a successful connection
        const db = client.db("TestDB");
        const collection = db.collection('employees');
        const documents = await readFile();
        await collection.deleteMany({});
        await collection.insertMany(JSON.parse(documents));
        // const c = await collection.countDocuments();
        // console.log(c);
        console.log(`${JSON.parse(documents).length} documents inserted successfully.`);
        console.log(`End Time: ${Date.now()}`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
