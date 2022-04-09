import SideBar from "../../../../src/components/Sidebar";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Product() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [productDetail, setProductDetail] = useState({
    temperature: "",
    speed: "",
    pressure: "",
    undsen_salinik: "",
    gogtsoo_rezin: "",
    tulah_tsagirag: "",
    erchimjuulegch: "",
    zahiin_tulah: "",
  });
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [image, setImage] = useState();
  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  const loadCategory = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/category`, []);
    setCategories(res.data);
  };
  useEffect(() => {
    loadCategory();
  }, [categories]);
  const handleProduct = async (e) => {
    e.preventDefault();
    const categoryId = e.target[1].selectedOptions[0].id;
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "sealjet");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/monex-solution/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setImage(data.secure_url);
    let res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/product`, {
      params: {
        image,
        title,
        description,
        categoryId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setProductId(res.data.result.insertId);
  };

  const handleProductDetail = async (e) => {
    e.preventDefault();
    let res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/product_detail`, {
      params: {
        productId: productId,
        temperature: productDetail.temperature,
        speed: productDetail.speed,
        pressure: productDetail.pressure,
        undsen_salinik: productDetail.undsen_salinik,
        tulah_tsagirag: productDetail.tulah_tsagirag,
        gogtsoo_rezin: productDetail.gogtsoo_rezin,
        erchimjuulegch: productDetail.erchimjuulegch,
        zahiin_tulah: productDetail.zahiin_tulah,
      },
    });
    setProductDetail((productDetail) => ({
      ...productDetail,
      ...{
        temperature: "",
        speed: "",
        pressure: "",
        undsen_salinik: "",
        gogtsoo_rezin: "",
        erchimjuulegch: "",
        tulah_tsagirag: "",
        zahiin_tulah: "",
      },
    }));
  };
  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Бүтээгдэхүүн</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <div className="flex justify-evenly">
            <div>
              <h2 className="font-bold text-xl mb-3">Бүтээгдэхүүн</h2>
              <form action="" className="w-full" onSubmit={handleProduct}>
                <div className="flex flex-col">
                  <label htmlFor="title" className="mb-3">
                    Бүтээгдэхүүний нэр
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="type" className="mb-3">
                    Ангилал
                  </label>
                  <select
                    name=""
                    id="type"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  >
                    {categories.map((category) => {
                      return (
                        <option
                          id={category.category_id}
                          key={category.category_id}
                        >
                          {category.type}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="mb-3">
                    Бүтээгдэхүүний дэлгэрэнгүй
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4 h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="file" className="mb-3">
                    Зураг оруулах
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleOnChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Нийтлэх"
                  className="mt-6 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
                />
              </form>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-3">
                Бүтээгдэхүүн дэлгэрэнгүй
              </h2>
              <form
                action=""
                className="justify-between w-full"
                onSubmit={handleProductDetail}
              >
                <div className="flex flex-col">
                  <label htmlFor="temperature" className="mb-3">
                    Температур
                  </label>
                  <input
                    type="text"
                    name="temperature"
                    id="temperature"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.temperature}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ temperature: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="speed" className="mb-3">
                    Шилжилтийн хурд
                  </label>
                  <input
                    type="text"
                    name="speed"
                    id="speed"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.speed}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ speed: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pressure" className="mb-3">
                    Даралт
                  </label>
                  <input
                    type="text"
                    name="pressure"
                    id="pressure"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.pressure}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ pressure: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="undsen_salinik" className="mb-3">
                    Үндсэн сальник
                  </label>
                  <input
                    type="text"
                    name="undsen_salinik"
                    id="undsen_salinik"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.undsen_salinik}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ undsen_salinik: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gogtsoo_rezin" className="mb-3">
                    Гогцоо резин
                  </label>
                  <input
                    type="text"
                    name="gogtsoo_rezin"
                    id="gogtsoo_rezin"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.gogtsoo_rezin}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ gogtsoo_rezin: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tulah_tsagirag" className="mb-3">
                    Тулах цагираг
                  </label>
                  <input
                    type="text"
                    name="tulah_tsagirag"
                    id="tulah_tsagirag"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.tulah_tsagirag}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ tulah_tsagirag: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="v" className="mb-3">
                    Эрчимжүүлэгч
                  </label>
                  <input
                    name="erchimjuulegch"
                    id="erchimjuulegch"
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.erchimjuulegch}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ erchimjuulegch: e.target.value },
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="zahiin_tulah" className="mb-3">
                    Захын тулах
                  </label>
                  <input
                    name="zahiin_tulah"
                    id="zahiin_tulah"
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={productDetail.zahiin_tulah}
                    onChange={(e) =>
                      setProductDetail((productDetail) => ({
                        ...productDetail,
                        ...{ zahiin_tulah: e.target.value },
                      }))
                    }
                  />
                </div>

                <input
                  type="submit"
                  value="Нийтлэх"
                  className="mt-6 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
