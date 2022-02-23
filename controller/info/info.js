import { executeQuery } from "../../config/db";
const getAllInfos = async (req, res) => {
  let id = req.query.id;
  console.log(req.query);
  try {
    let infoData = await executeQuery(
      `
          select * from infos 
          `,
      []
    );
    res.send(infoData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getInfoById = async (req, res) => {
  let id = req.query.id;
  let perPageNum = req.query.per;

  try {
    let allDataLength = await executeQuery(`
        select count(info_id) as numbers, max(info_id) as num from infos 
        `);
    if (perPageNum > allDataLength[0].num) {
      perPageNum = allDataLength[0].num;
    }
    let pageNum = allDataLength[0].num - ((id - 1) * perPageNum);
    let infoData = await executeQuery(
      `
          select * from infos 
          where info_id <= ${pageNum}
          and info_id > (${pageNum} - ${perPageNum})
          order by info_id desc
      `,
      []
    );

    res.status(200).json({
      infoData: infoData,
      page: Math.ceil(allDataLength[0].numbers / perPageNum),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteInfoById = async (req, res) => {
  let id = req.query.id;
  try {
    let infoData = await executeQuery(
      `delete from infos where info_id=${id}`,
      []
    );
    infoData = await executeQuery(
      `select * from infos where info_id=${infoData.insertId}`
    );
    res.status(200).json(infoData);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateInfoById = async (req, res) => {
  try {
    let infoData = await executeQuery(`select * from infos where info_id=?`, [
      id,
    ]);

    if (infoData.length > 0) {
      infoData = await executeQuery(
        "update infos set title=? img=? description=?",
        [title, image, description]
      );
      res.status(200).json(infoData);
    } else {
      res.status(400).json(`info not found on id=${id}`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllInfos, getInfoById, deleteInfoById };
