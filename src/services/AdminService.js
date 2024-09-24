import connection from "../connect/database.js";
let createUserAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    console.log(">>>check data :", data);
    try {
      let { FirstName, LastName, Email, PassWord, PhoneNumber, Avarta, role } =
        data;

      // Thêm thông tin người dùng vào bảng User
      let sqlUser = `
        INSERT INTO User (FirstName, LastName, Email, PassWord, PhoneNumber, Avarta)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        sqlUser,
        [FirstName, LastName, Email, PassWord, PhoneNumber, Avarta],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            const userId = results.insertId;

            // Khởi tạo bản ghi trong bảng Financial với giá trị mặc định
            let sqlFinancial = `
              INSERT INTO Financial (UserId, Avai_monney, Income, Expense)
              VALUES (?, 0, 0, 0)
            `;

            connection.query(
              sqlFinancial,
              [userId],
              (financialErr, financialResults) => {
                if (financialErr) {
                  reject(financialErr);
                } else {
                  // Khởi tạo bản ghi trong bảng Roled với vai trò tương ứng
                  let isAdmin = role === "admin" ? 1 : 0;
                  let isUser = role === "user" ? 1 : 0;
                  let sqlRole = `
                    INSERT INTO Roled (UserId, isAdmin, isUser)
                    VALUES (?, ?, ?)
                  `;

                  connection.query(
                    sqlRole,
                    [userId, isAdmin, isUser],
                    (roleErr, roleResults) => {
                      if (roleErr) {
                        reject(roleErr);
                      } else {
                        resolve(
                          "User, role, and initial financial records created successfully!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
let updateUserAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let {
        userId,
        FirstName,
        LastName,
        Email,
        PassWord,
        PhoneNumber,
        Avarta,
        role,
      } = data;
      console.log(">>>check data:", data);
      let sqlUser = `
        UPDATE User
        SET FirstName = ?, LastName = ?, Email = ?, PassWord = ?, PhoneNumber = ?, Avarta = ?
        WHERE ID = ?
      `;
      connection.query(
        sqlUser,
        [FirstName, LastName, Email, PassWord, PhoneNumber, Avarta, userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            let isAdmin = role === "admin" ? 1 : 0;
            let isUser = role === "user" ? 1 : 0;
            let sqlRole = `
              UPDATE Roled
              SET isAdmin = ?, isUser = ?
              WHERE UserId = ?
            `;
            connection.query(
              sqlRole,
              [isAdmin, isUser, userId],
              (roleErr, roleResults) => {
                if (roleErr) {
                  reject(roleErr);
                } else {
                  resolve("User and role updated successfully!");
                }
              }
            );
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

let deleteUser = async (userId) => {
  console.log(">>>check userId", userId);
  return new Promise((resolve, reject) => {
    let ID = userId.userId;
    console.log(">>>check ID:", ID);
    try {
      let sql = `DELETE FROM User WHERE ID = ?`;

      connection.query(sql, [ID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve("User deleted successfully!");
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};
let getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    try {
      let sql = `SELECT * FROM User`;
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default { createUserAdmin, updateUserAdmin, deleteUser, getAllUsers };
