import UserService from "../services/UserService.js";
let { CreateAcount, EditUserInfo } = UserService;
let CreateAcoutUser = async (req, res) => {
  let messenger = await CreateAcount(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
let EditUser = async (req, res) => {
  let messenger = await EditUserInfo(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
export default { CreateAcoutUser, EditUser };
