const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const MONGO_KEY = process.env.MONGO_ATLAS_PW;
const MONGO_URI = process.env.MONGO_ATLAS_URI;

mongoose
  .connect(
    `${MONGO_URI}
    `,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );
