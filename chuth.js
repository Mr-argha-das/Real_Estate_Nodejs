const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://avbigbuddy:nZ4ATPTwJjzYnm20@cluster0.wplpkxz.mongodb.net/RealEstateMain";
const DB_NAME = "RealEstateMain";
// sdsd;
// const OLD_DOMAIN = "https://real-esate-oghre.ondigitalocean.app";
const OLD_DOMAIN = "https://realestatebackend-vjq3.onrender.com";
const NEW_DOMAIN = "https://api.dnsdxb.com";

// Recursively replace old domain in all string fields of an object
function replaceDomainInObject(obj) {
  let modified = false;

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      if (obj[key].includes(OLD_DOMAIN)) {
        obj[key] = obj[key].replaceAll(OLD_DOMAIN, NEW_DOMAIN);
        modified = true;
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const subModified = replaceDomainInObject(obj[key]);
      if (subModified) modified = true;
    }
  }

  return modified;
}

async function updateDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collections = await db.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const cursor = collection.find({});

      let updateCount = 0;

      while (await cursor.hasNext()) {
        const doc = await cursor.next();

        // Shallow clone keeping _id intact
        const newDoc = { ...doc };

        const modified = replaceDomainInObject(newDoc);

        if (modified) {
          await collection.replaceOne({ _id: doc._id }, newDoc);
          console.log(
            `✅ Updated document in "${collectionName}" with _id: ${doc._id}`
          );
          updateCount++;
        }
      }

      if (updateCount === 0) {
        console.log(`ℹ️ No changes needed in collection: ${collectionName}`);
      }
    }

    console.log("🎉 Domain replacement complete in all collections.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

updateDatabase();
