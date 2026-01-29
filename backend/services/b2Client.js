import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: "us-east-1", // dummy
  endpoint: process.env.B2_ENDPOINT,

  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },

  forcePathStyle: true,
});

export default s3;
