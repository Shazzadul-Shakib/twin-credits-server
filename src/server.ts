// import mongoose from "mongoose";
import { Server as HTTPServer } from "http";
import config from "./app/config";
import app from "./app";
import mongoose from "mongoose";

let server: HTTPServer;
const PORT = config.port || 5000;

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string);

    server = app.listen(PORT, () => {
      console.log(`Twin Credits server is running to the port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

//  ----- handle unhandledRejections & uncaughtExceptions ----- //
process.on("unhandledRejection", (reason, promise) => {
  console.error(`😈 unhandledRejection is detected , shutting down ...`);
  console.error("Unhandled Rejection at:", promise, "reason:", reason);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error(`😈 uncaughtException is detected , shutting down ...`, err);
  process.exit(1);
});
