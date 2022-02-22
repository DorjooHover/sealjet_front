import Link from "next/link";
import { useState } from "react";
import {
  CheckCircleOutline,
  Category,
  FormatPaint,
  Feed,
  Settings,
} from "@mui/icons-material";
export default function SideBar() {
  //   [color, setColor] = useState("");
  const changeCurrentPage = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg h-screen flex-1 p-6">
      <div className="h-12 mb-6">
        <img src="/img/sealjet-logo.png" alt="" className="h-full w-auto" />
      </div>
      <ul className="pt-6 border-gray-400 border-solid border-t">
        <li className="mb-4">
          <Link href="/admin/dashboard/order">
            <a className={`text-gray-400`}>
              <CheckCircleOutline className="mr-2" />
              Захиалга
            </a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/dashboard/product">
            <a className="text-gray-400">
              <Category className="mr-2" />
              Бүтээгдэхүүн
            </a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/dashboard/material">
            <a className="text-gray-400">
              <FormatPaint className="mr-2" />
              Материал
            </a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/dashboard/info">
            <a className="text-gray-400">
              <Feed className="mr-2" />
              Мэдээ
            </a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/dashboard/setting">
            <a className="text-gray-400">
              <Settings className="mr-2" />
              Тохиргоо
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
