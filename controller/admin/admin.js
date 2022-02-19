import { executeQuery } from "../../config/db";

const getAllAdmins = async (req, res) => {
  try {
    let adminData = await executeQuery(
      `
        select * from admin
        `,
      []
    );
    res.send(adminData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateAdmin = async (req, res) => {
  let id = req.query.id;
  let password = req.body.password;
  let name = req.body.name;
  try {
    let data = await executeQuery(
      `
        update admin set password=?, name=? where id=${id}  
        `,
      [password, name]
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export { getAllAdmins, updateAdmin };
