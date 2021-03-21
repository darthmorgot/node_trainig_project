const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url, {useUnifiedTopology: true})
  .then((client) => client.db(`code-and-magick`))
  .catch((e) => {
    console.log(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
