import mongoose from "mongoose";
const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
    console.log("Database Connected")
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
