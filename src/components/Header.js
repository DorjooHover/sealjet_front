import { Facebook, Instagram } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "@mui/material";
import Logo from "./Logo";
export default function Header({ data, logo }) {
  return (
    <div className="header relative" key={data.header_id}>
      <span className="opacity-50 z-0 absolute inset-0 h-full w-full bg-black"></span>
      <div className="w-4/5 mx-auto relative header_content z-20 flex flex-nowrap py-12">
        <div className="w-3/5 mr-8 flex items-center">
          <img src={data.logo} alt="product" />
        </div>
        <div className="mt-24">
          <h2 className="text-white font-black text-3xl">{data.title}</h2>
          <p className="text-white opacity-60 align-justify mt-4">
            {data.description}
          </p>
        </div>
      </div>
      <div className="px-10 py-10 mt-10"><Logo logo={logo}/></div>
      <div className="flex absolute right-0 top-1/2 social flex-col rounded-md social">
        <Link href="/" className="px-2 py-5 ">
          <Facebook className="w-7 h-7 text-white" />
        </Link>
        <Link href="/" className="px-2 py-5 ">
          <Instagram className="w-7 h-7 text-white" />
        </Link>
        <Link href="/" className="px-2 py-5 ">
          <YouTubeIcon className="w-7 h-7 text-white" />
        </Link>
      </div>
    </div>
  );
}
