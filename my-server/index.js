const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// mongodb url
const uri =
  "mongodb+srv://priyotush:2pvANenYMrx9Twss@cluster0.ke7g9qv.mongodb.net/?appName=Cluster0";

// mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Run function
async function run() {
  try {
    await client.connect();

    // database collection
    const userDB = client.db("userDB");
    const userCollection = userDB.collection("users");

    // user create
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    // read all data
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();

      res.send(result);
    });

    // read single data
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.findOne({ _id: new ObjectId(id) });

      res.send(result);
    });

    // delete data
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

      res.send(result);
    });

    console.log("mongodb connection successfully");
  } catch (err) {
    console.log("mongodb connection fail : ", err);
  }
}

run().catch(console.dir);

// default path
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// server listen
app.listen(port, () => {
  console.log(`server is running : http://localhost:${port}`);
});
