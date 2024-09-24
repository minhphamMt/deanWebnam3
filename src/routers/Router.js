import { Router } from "express";
import express from "express";
import Admin from "../controlers/Admin.js";
let { postUser, updateUserAdmins, deleteUserAdmin, getAllAdmin } = Admin;
import UserController from "../controlers/UserController.js";
let { CreateAcoutUser, EditUser } = UserController;
import financialController from "../controlers/financialController.js";
let { postTransaction, deleteTran } = financialController;
let router = express.Router();
// =========ADMIN
router.post("/admin/CreateUser", postUser);
router.put("/admin/EditUser", updateUserAdmins);
router.delete("/admin/DeleteUser", deleteUserAdmin);
router.get("/admin/getAll", getAllAdmin);
// =============User
router.post("/user/CreateAcout", CreateAcoutUser);
router.put("/user/EditInfo", EditUser);
// ====FINANCIAL
router.post("/api/TranSaction", postTransaction);
router.delete("/api/deleteTran", deleteTran);
let initWebRoute = (app) => {
  return app.use("/", router);
};
export default initWebRoute;
