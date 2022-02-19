import { executeQuery } from "../../config/db";
const getProductDetailById = async (req, res) => {
  let id = req.query.id;
  try {
    let productDetailData = await executeQuery(
      `
          select * from product_details pd
          inner join products p on p.product_id = pd.product_id 
          where p.product_id = ${id}
          `,
      []
    );
    res.send(productDetailData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createProductDetail = async (req, res) => {
  let id = req.query.id;
  let temperature = req.body.temperature;
  let speed = req.body.speed;
  let pressure = req.body.pressure;
  let undsen_salinik = req.body.undsen_salinik;
  let tulah_tsagirag = req.body.tulah_tsagirag;
  let gogtsoo_rezin = req.body.gogtsoo_rezin;
  let erchimjuulegch = req.body.erchimjuulegch;
  let zahiin_tulah = req.body.zahiin_tulah;
  try {
    let productDetailData = await executeQuery(
      `
         insert into product_details(product_id, temperature, speed, pressure, undsen_salinik, tulah_tsagirag, gogtsoo_rezin, erchimjuulegch, zahiin_tulah)
           values(${id}, ?, ?, ?, ?, ?, ? , ?, ?)
         `,
      [
        temperature,
        speed,
        pressure,
        undsen_salinik,
        tulah_tsagirag,
        gogtsoo_rezin,
        erchimjuulegch,
        zahiin_tulah,
      ]
    );
    res.status(201).json(productDetailData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { getProductDetailById, createProductDetail };
