import { Facebook, Instagram, Youtube } from "@mui/icons-material"
import { Link } from "@mui/material"
export default function Header({data}) {

     return (
          <div className='header relative'>
              <span className='opacity-70 z-0 absolute inset-0 h-full w-full bg-black'></span>
              <div className="w-4/5 mx-auto relative z-20 flex flex-nowrap pt-12">
                  <div className="w-2/5 mr-8"><img src='/img/product/product_1.png' alt="" />
                  </div>
                  <div className="mt-24">
                    <h2 className="text-white font-black text-3xl" key={data[0].header_id}>{data[0].title}</h2>
                    <p className="text-white opacity-60 align-justify mt-4">{data[0].title}</p>
                  </div>
              </div>
              <div className="flex absolute right-0 top-1/2 social">
                  <Link href='/'><Facebook /></Link>
                  <Link href='/'><Instagram /></Link>
                  <Link href='/'><Youtube /></Link>
              </div>
          </div>
     )
}