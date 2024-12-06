import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import globalVariableCls from "@/lib/globalVariable";

// let isConnected = false;

export default async function connect(){
  if (globalVariableCls.global.mongoose) return;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!);

    mongoose.connection.on("connected", () => {
        globalVariableCls.global.mongoose = true;
      console.log("Mongoose connected successfully.");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Mongoose connection error:", error);
      process.exit(1);
    });

    // Register models only once
    await registerModels();

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const registerModels = async () => {
  const modelsDir = path.resolve(process.cwd(), "src/models");
  const files = fs.readdirSync(modelsDir);

  for (const file of files) {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
      const modelName = file.split(".")[0];
      if (!mongoose.models[modelName]) {
        // const filePath = path.join(modelsDir, file);
        await import(`@/models/${file}`);
        // console.log(`Model ${modelName} registered.`);
      }
    }
  }
};
