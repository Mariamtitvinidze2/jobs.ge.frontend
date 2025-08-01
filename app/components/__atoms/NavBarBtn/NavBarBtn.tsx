import React from 'react'
import Link from 'next/link'
type Btn = {
    text: string
    link: string
}
export default function NavBarBtn({ text, link }: Btn) {
    return (
        <li className="cursor-pointer w-full  hover:bg-[#9b979723] pb-1">
            <Link href={link} className='cursor-pointer'>
                <button className="text-[15px] text-black  cursor-pointer ">
                    {text}
                </button>
            </Link>
        </li>
    )
}
