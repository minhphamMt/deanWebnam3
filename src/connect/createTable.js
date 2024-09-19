// src/scripts/createTable.js
import connection from "../connect/database.js";

const queries = [
  `CREATE TABLE IF NOT EXISTS User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    PassWord VARCHAR(255),
    PhoneNumber VARCHAR(20),
    Avarta VARCHAR(255)
  );`,
  `CREATE TABLE IF NOT EXISTS Roled (
   ID INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT,
  isAdmin TINYINT(1) DEFAULT 0,
  isUser TINYINT(1) DEFAULT 0,
  FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS Financial (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Avai_monney DECIMAL(15, 2),
    Income DECIMAL(15, 2),
    Expense DECIMAL(15, 2),
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS Transaction (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Type ENUM('thu', 'chi') NOT NULL,
    Amount DECIMAL(15, 2) NOT NULL,
    Category ENUM('ăn uống', 'thời trang', 'học tập', 'gia đình', 'giải trí') NOT NULL,
    Description TEXT,
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS Saving_Plan (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Goal_amount DECIMAL(15, 2),
    Saved_amount DECIMAL(15, 2),
    Start_date DATE,
    End_date DATE,
    Description TEXT,
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS Financial_report (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Time DATE,
    Type ENUM('tháng', 'năm', 'ngày') NOT NULL,
    Monney DECIMAL(15, 2),
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS Loans (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    Type ENUM('ngắn hạn', 'dài hạn') NOT NULL,
    Amount DECIMAL(15, 2),
    Interest_Rate DECIMAL(5, 2),
    Interest_monney DECIMAL(15, 2),
    Start_date DATE,
    End_date DATE,
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
  );`,
  `CREATE TABLE IF NOT EXISTS History (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    SourceType ENUM('transaction', 'loan', 'saving_plan') NOT NULL,  -- Loại nguồn
    SourceId INT NOT NULL,  -- ID của nguồn giao dịch (Transaction ID, Loan ID hoặc Saving_Plan ID)
    Type ENUM('thu', 'chi') NOT NULL,  -- Loại giao dịch (thu/chi cho giao dịch hoặc khoản vay)
    Amount DECIMAL(15, 2) NOT NULL,  -- Số tiền
    Category ENUM('ăn uống', 'thời trang', 'học tập', 'gia đình', 'giải trí', 'vay', 'tiết kiệm') NOT NULL,  -- Loại chi phí
    Description TEXT,  -- Mô tả chi tiết
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Ngày thực hiện giao dịch
    FOREIGN KEY (UserId) REFERENCES User(ID) ON DELETE CASCADE
);
`,
];
queries.forEach((query, index) => {
  connection.query(query, (err, results) => {
    if (err) {
      console.error(`Lỗi khi tạo bảng ${index + 1}: `, err);
      return;
    }
    console.log(`Bảng ${index + 1} đã được tạo thành công:`, results);
  });
});

connection.end();
