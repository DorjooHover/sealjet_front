import Link from 'next/link'
export default function Footer() {
    return (
        <div className='footer flex justify-between mx-auto py-14'>
            <div className='w-2/5'>
                <div className='flex justify-between'>
                    <div className='contact overflow-hidden rounded-md h-12 p-2'>
                        <img src='./img/sealjet-logo.png' className='h-full'/>
                    </div>
                    <p className="footer_text font-bold text-xl">Холбоо барих</p>
                </div>
                    <p className="section_text mt-6">Marketing is a company that focus on developing company’s strategy for increase digital marketing</p>
            </div>
            <div className='flex justify-between w-2/5'>
                <ul>
                    <li className="footer_text font-bold text-xl mb-6">Цэс</li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text"><Link href='/'><a>Нүүр</a></Link></li>
                </ul>
                <ul>
                    <li className="footer_text font-bold text-xl mb-6">Цэс</li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text"><Link href='/'><a>Нүүр</a></Link></li>
                </ul>
                <ul>
                    <li className="footer_text font-bold text-xl mb-6">Цэс</li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text mb-2"><Link href='/'><a>Нүүр</a></Link></li>
                    <li className="section_text"><Link href='/'><a>Нүүр</a></Link></li>
                </ul>
            </div>
        </div>
    )
}