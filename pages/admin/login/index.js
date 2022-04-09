import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
export default function Admin() {
  const [admin, setAdmin] = useState([]);
  const [message, setMessage] = useState();
  const loadAdmin = async () => {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_URL}/api/admin`,
    });
    setAdmin(res.data);
  };
  useEffect(() => {
    loadAdmin();
  }, [admin]);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin[0]);
    admin[0].name == username && admin[0].password == password
      ? router.push({
          pathname: "/admin/dashboard/order",
          query: { status: "active" },
        })
      : setMessage("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
  };
  return (
    <div className="absolute top-0 z-40">
      <Head>
        <title>Нэвтрэх</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="bg h-screen w-screen w-screen flex items-center justify-center flex-col">
        <div className="h-20 mb-12">
          <img src="/img/sealjet-logo.png" className="h-full w-auto" alt="" />
        </div>
        <h4 className="mb-4 text-red-600 text-xl">{message}</h4>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white font-normal mb-3">
              Нэвтрэх нэр
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-96 p-2 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white font-normal my-3">
              Нууц үг
            </label>
            <input
              type="password"
              className="w-96 p-2 rounded-md"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Нэвтрэх"
            className="text-white mt-10 btn px-2 py-3 text-center rounded-md cursor-pointer text-base font-bold w-full"
          />
        </form>
      </div>
    </div>
  );
}
