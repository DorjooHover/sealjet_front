import { executeQuery } from "../../config/db";
const getAllHeaders = async (req, res) => {
  try {
    let headerData = await executeQuery("select * from headers", []);
    res.send(headerData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// const createHeader = async (req, res) => {
//      let title = req.query.title
//      try {
//           let headerData = await executeQuery(`insert into headers( title) values(?)`, [title])
//           res.status(201).json(headerData)

//      } catch (error) {
//           res.status(500).json(error)
//      }
// }
const updateHeader = async (req, res) => {
  let { title, bgImg, image, description } = req.body.params;
  try {
    let headerData = await executeQuery(
      `
          update headers set title=? , img=? , logo=?, description=?
          limit 1
          `,
      [title, bgImg, image, description]
    );
    res.status(200).send(headerData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export { getAllHeaders, updateHeader };
