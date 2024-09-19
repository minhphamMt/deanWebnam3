import connection from "../connect/database.js"; // Kết nối với database

let createTransaction = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { UserId, Type, Amount, Category, Description } = data;
      // Bắt đầu giao dịch bằng cách thêm vào bảng Transaction
      let sqlTransaction = `
        INSERT INTO Transaction (UserId, Type, Amount, Category, Description)
        VALUES (?, ?, ?, ?, ?)
      `;
      connection.query(
        sqlTransaction,
        [UserId, Type, Amount, Category, Description],
        (err, transactionResults) => {
          if (err) {
            return reject(err);
          }
          // Cập nhật lại số tiền của người dùng dựa trên loại giao dịch
          let updateSql = "";
          if (Type === "thu") {
            // Cập nhật income và available money khi thu
            updateSql = `
              UPDATE Financial
              SET Income = Income + ?, Avai_monney = Avai_monney + ?
              WHERE UserId = ?
            `;
          } else if (Type === "chi") {
            // Cập nhật expense và available money khi chi
            updateSql = `
              UPDATE Financial
              SET Expense = Expense + ?, Avai_monney = Avai_monney - ?
              WHERE UserId = ?
            `;
          }
          connection.query(
            updateSql,
            [Amount, Amount, UserId],
            (financialErr, financialResults) => {
              if (financialErr) {
                return reject(financialErr);
              }
              // Lưu lịch sử giao dịch vào bảng History
              let sqlHistory = `
                INSERT INTO History (UserId, SourceType, SourceId, Type, Amount, Category, Description)
                VALUES (?, 'transaction', ?, ?, ?, ?, ?)
              `;
              connection.query(
                sqlHistory,
                [
                  UserId,
                  transactionResults.insertId,
                  Type,
                  Amount,
                  Category,
                  Description,
                ],
                (historyErr, historyResults) => {
                  if (historyErr) {
                    return reject(historyErr);
                  }
                  resolve(
                    "Transaction created, financial data updated, and history recorded successfully!"
                  );
                }
              );
            }
          );
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export default { createTransaction };
