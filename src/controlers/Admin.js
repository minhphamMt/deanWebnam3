import AdminService from "../services/AdminService.js";
let { createUserAdmin, updateUserAdmin, deleteUser, getAllUsers } =
  AdminService;
let postUser = async (req, res) => {
  let messenger = await createUserAdmin(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
let updateUserAdmins = async (req, res) => {
  let messenger = await updateUserAdmin(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
let deleteUserAdmin = async (req, res) => {
  let messenger = await deleteUser(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
let getAllAdmin = async (req, res) => {
  let messenger = await getAllUsers();
  console.log(">>>messenger =:", messenger);
  return res.status(200).json({
    messenger,
  });
};
export default { postUser, updateUserAdmins, deleteUserAdmin, getAllAdmin };
