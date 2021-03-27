const {MongoClient} = require(`mongodb`);
const logger = require('../logger.js');

const url = process.env.MONGO_URL || `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url, {useUnifiedTopology: true})
  .then((client) => client.db(`code-and-magick`))
  .catch((e) => {
    logger.info(`Failed to connect to MongoDB`, e);
    process.exit(1);
  });
