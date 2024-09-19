import connection from "../connect/database.js";
let CreateAcount = async (data) => {
  return new Promise((resolve, reject) => {
    console.log(">>>check data :", data);
    try {
      let { FirstName, LastName, Email, PassWord, PhoneNumber, Avarta } = data;
      // Thêm người dùng vào bảng User
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
            const userId = results.insertId; // Lấy UserId vừa tạo
            // Thêm bản ghi vào bảng Roled
            let sqlRole = `
            INSERT INTO Roled (UserId, isAdmin, isUser)
            VALUES (?, 0, 1)  -- Giả sử mặc định là user, admin = 0
          `;
            connection.query(sqlRole, [userId], (roleErr, roleResults) => {
              if (roleErr) {
                reject(roleErr);
              } else {
                // Thêm bản ghi vào bảng Financial
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
                      resolve(
                        "Account created successfully, with all related records!"
                      );
                    }
                  }
                );
              }
            });
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

let EditUserInfo = async (data) => {
  return new Promise((resolve, reject) => {
    console.log(">>>check data:", data);
    try {
      let {
        userId,
        FirstName,
        LastName,
        Email,
        PassWord,
        PhoneNumber,
        Avarta,
      } = data;
      let sqlUpdateUser = `
        UPDATE User
        SET FirstName = ?, LastName = ?, Email = ?, PassWord = ?, PhoneNumber = ?, Avarta = ?
        WHERE ID = ?
      `;
      connection.query(
        sqlUpdateUser,
        [FirstName, LastName, Email, PassWord, PhoneNumber, Avarta, userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve("User information updated successfully!");
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
export default { CreateAcount, EditUserInfo };
