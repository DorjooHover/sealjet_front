import { useRouter } from "next/router";
import { useState } from "react";
export default function Orders() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [height, setHeight] = useState("");
  const [gadnaD, setGadnaD] = useState("");
  const [dotorD, setDotorD] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let res = await axios.post(`http://localhost:3000/api/order`, formData, {
      params: {
        name,
        phone,
        comment,
        height,
        gadnaD,
        dotorD,
        email,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFile(null);
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="title mx-auto py-10">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-3">
              Овог, нэр
            </label>
            <input
              type="text"
              name="name"
              className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-3">
              Утасны дугаар
            </label>
            <input
              type="tel"
              name="phone"
              className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              value={phone}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-3">
              Цахим хаяг
            </label>
            <input
              type="email"
              name="email"
              className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-96">
            <label htmlFor="" className="mb-3">
              Зураг оруулах
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="" className="mr-4">
              Гадна диаметр
            </label>
            <input
              type="number"
              name="gadna_d"
              className="w-20 rounded-md border-gray-300 border-solid border py-2 px-3 mr-1"
              value={gadnaD}
              onChange={(e) => setGadnaD(e.target.value)}
            />
            см
          </div>
          <div>
            <label htmlFor="" className="mr-4">
              Дотор диаметр
            </label>
            <input
              type="number"
              name="dotor_d"
              className="w-20 rounded-md border-gray-300 border-solid border py-2 px-3 mr-1"
              value={dotorD}
              onChange={(e) => setDotorD(e.target.value)}
            />
            см
          </div>
          <div>
            <label htmlFor="" className="mr-4">
              Өндөр
            </label>
            <input
              type="number"
              name="height"
              className="w-20 mr-1 rounded-md border-gray-300 border-solid border py-2 px-3"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            см
          </div>
        </div>
        <div className="flex justify-between items-end mt-3">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-3">
              Хүсэлт
            </label>
            <textarea
              type="text"
              name="comment"
              className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              height="300"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Илгээх"
            className="h-12 py-2 rounded-full bg text-white font-bold w-48"
          />
        </div>
      </form>
    </div>
  );
}
