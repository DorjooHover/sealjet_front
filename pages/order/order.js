import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
export default function Orders() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState(0);
  const [gadnaD, setGadnaD] = useState(0);
  const [dotorD, setDotorD] = useState(0);
  const [email, setEmail] = useState("");
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

  const material_id = router.query.material_id;
  const product_id = router.query.product_id;
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    let res = await axios.post(`/api/order`, {
      params: {
        name,
        phone,
        image,
        comment,
        height,
        gadnaD,
        dotorD,
        email,
        material_id,
        product_id,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setComment("");
    setHeight(0);
    setGadnaD(0);
    setDotorD(0);
    setEmail("");
    setPhone("");
  };
  return (
    <div>
      <Head>
        <title>Захиалга</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex flex-col justify-center order">
        <h2 className="title text-2xl font-bold mx-auto  py-5">Захиалах </h2>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="title mx-auto py-10"
        >
          <div className="flex o_detail">
            <div className="flex flex-col mr-8">
              <label htmlFor="name" className="mb-3">
                Овог, нэр
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-3">
                Утасны дугаар
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between o_detail">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-3">
                Цахим хаяг
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-96 m_b">
              <label htmlFor="file" className="mb-3">
                Зураг оруулах
              </label>
              <input
                type="file"
                name="file"
                id="file"
                // value={file}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between o_detail">
            <div className="m_b">
              <label htmlFor="gadna_d" className="mr-4">
                Гадна диаметр
              </label>
              <input
                type="number"
                name="gadna_d"
                id="gadna_d"
                className="w-20 rounded-md border-gray-300 border-solid border py-2 px-3 mr-1"
                value={gadnaD}
                onChange={(e) => setGadnaD(e.target.value)}
              />
              см
            </div>
            <div className='m_b'>
              <label htmlFor="dotor_d" className="mr-4">
                Дотор диаметр
              </label>
              <input
                type="number"
                name="dotor_d"
                id="dotor_d"
                className="w-20 rounded-md border-gray-300 border-solid border py-2 px-3 mr-1"
                value={dotorD}
                onChange={(e) => setDotorD(e.target.value)}
              />
              см
            </div>
            <div className='m_b'>
              <label htmlFor="height" className="mr-4">
                Өндөр
              </label>
              <input
                type="number"
                name="height"
                id="height"
                className="w-20 mr-1 rounded-md border-gray-300 border-solid border py-2 px-3"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              см
            </div>
          </div>
          <div className="flex justify-between items-end mt-3 o_detail">
            <div className="flex flex-col">
              <label htmlFor="comment" className="mb-3">
                Хүсэлт
              </label>
              <textarea
                type="text"
                name="comment"
                id="comment"
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                height="300"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Илгээх"
              className="h-12 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
