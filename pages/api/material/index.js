import nc from "next-connect";
import { getAllMaterials } from "../../../controller/material/material";
import { executeQuery } from "../../../config/db";

const handler = nc();
handler.get(getAllMaterials);
handler.post(async (req, res) => {
  let image = req.body.params.image;
  let name = req.body.params.name;
  let description = req.body.params.description;
  let result = await executeQuery(
    "insert into materials(img, name, description) values(?, ?, ?)",
    [image, name, description]
  );
  res.status(200).send({
    result: result,
  });
});

export default handler;
