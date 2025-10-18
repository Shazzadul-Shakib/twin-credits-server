import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
};
export default config;
