import nc from "next-connect";
import { getAllInfos } from "../../../controller/info/info";
import { executeQuery } from "../../../config/db";
const handler = nc();

handler.get(getAllInfos);
handler.post(async (req, res) => {
  let image = req.body.params.image;
  let title = req.body.params.title;
  let description = req.body.params.description;
  console.log(req, image, title, description);
  let result = await executeQuery(
    "insert into infos(img, title, description) values(?, ?, ?)",
    [image, title, description]
  );
  res.status(200).send({
    result: result,
  });
});

export default handler;
