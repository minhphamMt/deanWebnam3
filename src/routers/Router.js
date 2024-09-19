import { Router } from "express";
import express from "express";
import Admin from "../controlers/Admin.js";
let { postUser, updateUserAdmins, deleteUserAdmin } = Admin;
import UserController from "../controlers/UserController.js";
let { CreateAcoutUser, EditUser } = UserController;
import financialController from "../controlers/financialController.js";
let { postTransaction } = financialController;
let router = express.Router();
// =========ADMIN
router.post("/admin/CreateUser", postUser);
router.put("/admin/EditUser", updateUserAdmins);
router.delete("/admin/DeleteUser", deleteUserAdmin);
// =============User
router.post("/user/CreateAcout", CreateAcoutUser);
router.put("/user/EditInfo", EditUser);
// ====FINANCIAL
router.post("/api/TranSaction", postTransaction);
let initWebRoute = (app) => {
  return app.use("/", router);
};
export default initWebRoute;
