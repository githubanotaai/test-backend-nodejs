const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const credentials = DB_USER ? `${DB_USER}:${DB_PASSWORD}@` : "";
const mongoURL = `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = async () => {
  mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true,
      authSource: "admin",
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB!!!");
    }
  );
};
