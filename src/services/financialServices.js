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
let deleteTransaction = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      // Trước hết, lấy thông tin của giao dịch cần xóa
      const { transactionId, userId } = data;
      let sqlGetTransaction = `
        SELECT Type, Amount
        FROM Transaction
        WHERE ID = ? AND UserId = ?
      `;
      connection.query(
        sqlGetTransaction,
        [transactionId, userId],
        (err, transactionResults) => {
          if (err) {
            return reject(err);
          }
          if (transactionResults.length === 0) {
            return reject("Transaction not found.");
          }
          const { Type, Amount } = transactionResults[0];
          // Cập nhật lại số tiền của người dùng
          let updateSql = "";
          if (Type === "thu") {
            // Khi thu thì trừ đi income và available money
            updateSql = `
            UPDATE Financial
            SET Income = Income - ?, Avai_monney = Avai_monney - ?
            WHERE UserId = ?
          `;
          } else if (Type === "chi") {
            // Khi chi thì trừ đi expense và cộng lại available money
            updateSql = `
            UPDATE Financial
            SET Expense = Expense - ?, Avai_monney = Avai_monney + ?
            WHERE UserId = ?
          `;
          }
          connection.query(
            updateSql,
            [Amount, Amount, userId],
            (financialErr, financialResults) => {
              if (financialErr) {
                return reject(financialErr);
              }
              // Xóa giao dịch khỏi bảng Transaction
              let sqlDeleteTransaction = `
            DELETE FROM Transaction
            WHERE ID = ? AND UserId = ?
          `;
              connection.query(
                sqlDeleteTransaction,
                [transactionId, userId],
                (deleteErr, deleteResults) => {
                  if (deleteErr) {
                    return reject(deleteErr);
                  }
                  // Xóa lịch sử giao dịch khỏi bảng History
                  let sqlDeleteHistory = `
              DELETE FROM History
              WHERE SourceType = 'transaction' AND SourceId = ?
            `;
                  connection.query(
                    sqlDeleteHistory,
                    [transactionId],
                    (historyErr, historyResults) => {
                      if (historyErr) {
                        return reject(historyErr);
                      }
                      resolve(
                        "Transaction deleted and financial data updated successfully!"
                      );
                    }
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
export default { createTransaction, deleteTransaction };
