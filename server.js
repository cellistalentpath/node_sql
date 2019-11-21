var http = require("http");
var port = 6969;
var hostname = "http://localhost";

// const { Pool, Client } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "food-fighters",
//   password: "",
//   port: "5432" //5432
// });

// pool.query("INSERT INTO my_table (id) VALUES(2)", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://talentpath:talentpath@cluster0-5xmru.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

main = async () => {
  try {
    await client.connect();

    await listDatabases(client);

    // createListing(client, {
    //   name: "Lovely Loft",
    //   summary: "A charming loft in Paris",
    //   bedrooms: 1,
    //   bathrooms: 1
    // });
    updateListingByName(client, "Lovely Loft", { bedrooms: 6, beds: 8 });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function listDatabases(client) {
  databasesList = await client
    .db()
    .admin()
    .listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// async function createListing(client, newListing) {
//   const result = await client
//     .db("sample_airbnb")
//     .collection("listingsAndReviews")
//     .insertOne(newListing);
//   console.log(
//     `New listing created with the following id: ${result.insertedId}`
//   );
// }

async function updateListingByName(client, nameOfListing, updatedListing) {
  result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameOfListing }, { $set: updatedListing });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

main().catch(console.err);

var server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (request.method === "GET" && request.url === "/") {
    response.write("good job");
  }
  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
