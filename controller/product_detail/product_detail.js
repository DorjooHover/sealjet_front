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
  let productId = req.body.params.productId
  let temperature = req.body.params.temperature;
  let speed = req.body.params.speed;
  let pressure = req.body.params.pressure;
  let undsen_salinik = req.body.params.undsen_salinik;
  let tulah_tsagirag = req.body.params.tulah_tsagirag;
  let gogtsoo_rezin = req.body.params.gogtsoo_rezin;
  let erchimjuulegch = req.body.params.erchimjuulegch;
  let zahiin_tulah = req.body.params.zahiin_tulah;
  try {
    let productDetailData = await executeQuery(
      `
         insert into product_details(product_id, temperature, speed, pressure, undsen_salinik, tulah_tsagirag, gogtsoo_rezin, erchimjuulegch, zahiin_tulah)
           values(?, ?, ?, ?, ?, ?, ? , ?, ?)
         `,
      [
        productId,
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
