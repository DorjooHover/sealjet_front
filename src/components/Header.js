import { Facebook, Instagram } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "@mui/material";
import Logo from "./Logo";
export default function Header({ data }) {
  return (
    <div className="header relative">
      <span className="opacity-50 z-0 absolute inset-0 h-full w-full bg-black"></span>
      <div className="w-4/5 mx-auto relative z-20 flex flex-nowrap py-12">
        <div className="w-2/5 mr-8">
          <img src="/img/product/product_1.png" alt="" />
        </div>
        <div className="mt-24">
          <h2
            className="text-white font-black text-3xl"
            key={data[0].header_id}
          >
            {data[0].title}
          </h2>
          <p className="text-white opacity-60 align-justify mt-4">
            {data[0].description}
          </p>
        </div>
      </div>
      <div className="px-10 py-10 mt-10">
        <Logo />
      </div>
      <div className="flex absolute right-0 top-1/2 social flex-col rounded-md ">
        <Link href="/" className="px-2 py-5 text-white">
          <Facebook className="w-7 h-7" />
        </Link>
        <Link href="/" className="px-2 py-5 text-white">
          <Instagram className="w-7 h-7" />
        </Link>
        <Link href="/" className="px-2 py-5 text-white">
          <YouTubeIcon className="w-7 h-7" />
        </Link>
      </div>
    </div>
  );
}
