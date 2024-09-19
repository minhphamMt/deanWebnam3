import express from "express";
import dotenv from "dotenv";
import connection from "./src/connect/database.js";
import initWebRoute from "./src/routers/Router.js";

dotenv.config();

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let PORT = process.env.PORT || 5001;
initWebRoute(app);
connection.connect((err) => {
  if (err) {
    console.error("Unable to connect to the database:", err);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
