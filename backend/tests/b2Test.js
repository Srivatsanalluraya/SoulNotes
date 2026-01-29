import dotenv from "dotenv";
dotenv.config();

import s3 from "../services/b2Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

async function testUpload() {
  const data = Buffer.from("Hello AIDost 💙");

  const command = new PutObjectCommand({
    Bucket: process.env.B2_BUCKET,
    Key: "test/hello.txt",
    Body: data,
    ContentType: "text/plain",
  });

  await s3.send(command);

  console.log("Uploaded successfully ✅");
}

testUpload().catch(console.error);
