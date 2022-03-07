import { executeQuery } from "../../config/db";
const getAllLogos = async (req, res) => {
  try {
    let logoData = await executeQuery(
      `
    select * from logos
    `,
      []
    );
    res.send(logoData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getLogoById = async (req, res) => {
  let id = req.query.id;
  let logo_id = (id - 1) * 6;
  try {
    let logoData = await executeQuery(
      `
          select * from logos 
          limit ${logo_id}, 6
          `,
      []
    );
    let logoLength = await executeQuery(`
    select count(logo_id) as counts from logos
    `);
    res.send({ logoData: logoData, counts: logoLength[0].counts });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createLogo = async (req, res) => {
  let image = req.body.params.image;
  let name = req.body.params.name;
  let description = req.body.params.description;
  try {
    let logoData = await executeQuery(
      `
          insert into logos(name, img, description)
          values(?, ?, ?)
          `,
      [name, image, description]
    );
    res.status(201).send(logoData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteLogo = async (req, res) => {
  let id = req.query.id;
  try {
    let logoData = await executeQuery(
      `
        delete from logos where logo_id = ${id}
    `,
      []
    );
    res.status(200).send(logoData.insertId);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export { getAllLogos, getLogoById, createLogo, deleteLogo };
