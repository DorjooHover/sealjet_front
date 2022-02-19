import SideBar from "../../../../src/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
export default function Setting() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const loadPassword = async () => {
    let res = axios.get("http://localhost:3000/api/admin");
    // setPassword(res.data[0].password)
    console.log(res);
  };
  const changePassword = async (e) => {
    loadPassword();
    console.log(e);
    if (password == oldPassword) {
      if (oldPassword == authPassword) {
        let res = axios({
          method: "put",
          url: `http://localhost:3000/api/admin/1`,
          params: {
            name: name,
            password: newPassword,
          },
        });
      } else {
        setMessage("Нууц үг зөрсөн байна.");
      }
    } else {
      setMessage("Нууц үг буруу байна.");
    }
  };
  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Тохиргоо</title>
        <link rel="shortcut icon" href="/img/sealjet-logo.png"></link>
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <div>
            <h2 className="font-bold text-xl">Тохиргоо</h2>
            <form
              className="grid grid-cols-2 justify-between mt-4"
              onSubmit={changePassword}
            >
              <div className="flex flex-col">
                <label htmlFor="" className="mb-3">
                  Хэрэглэгчийн нэр солих
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
                  Шинэ нууц үг оруулуах
                </label>
                <input
                  type="password"
                  name="new_password"
                  className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-3">
                  Өмнөх нууц үг оруулуах
                </label>
                <input
                  type="password"
                  name="old_password"
                  className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mb-3">
                  Шинэ нууц үг дахин оруулуах
                </label>
                <input
                  type="password"
                  name="new_password_auth"
                  className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                  }}
                />
              </div>
              <input
                type="submit"
                value="Хадгалах"
                className="mt-10 py-2 w-48 rounded-full bg text-white font-bold cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
