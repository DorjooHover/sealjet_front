import Image from 'next/image'
export default function Material(data) {
    return (
        <div className='flex'>
            <div className='rounded-md overflow-hidden mb-12 px-2 section_img'>
                <Image src="/img/product/product_1.jpg" layout='fill'/>
            </div>
            <div className="ml-12">
                <div className="flex justify-between items-center ">
                    <h2 className="section_title font-medium mb-3 uppercase text-3xl ">{data.data.name}</h2>
                    <p className='section_text text-base flex-1'>{data.data.date}</p>
                </div>
                <p className="text-base section_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis nisi cupiditate eius! Similique, cum debitis.</p>
            </div>
        </div>
    )
}