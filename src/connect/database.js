import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "minhpham123",
  database: "deanweb",
});

connection.connect((err) => {
  if (err) {
    console.error("Kết nối đến MySQL bị lỗi: ", err.stack);
    return;
  }
  console.log("Kết nối thành công đến MySQL với id " + connection.threadId);
});

export default connection;
