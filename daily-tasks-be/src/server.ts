import app from "./app";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
