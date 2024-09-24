import financialServices from "../services/financialServices.js";
let { createTransaction, deleteTransaction } = financialServices;
let postTransaction = async (req, res) => {
  let messenger = await createTransaction(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
let deleteTran = async (req, res) => {
  let messenger = await deleteTransaction(req.body);
  console.log(">>>check messenger:", messenger);
  return res.status(200).json({
    messenger,
  });
};
export default { postTransaction, deleteTran };
