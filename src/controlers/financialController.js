import financialServices from "../services/financialServices.js";
let { createTransaction } = financialServices;
let postTransaction = async (req, res) => {
  let messenger = await createTransaction(req.body);
  console.log("messenger = ", messenger);
  return res.status(200).json({
    messenger,
  });
};
export default { postTransaction };
