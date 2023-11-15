import Link from "next/link"
import {FaLaptop} from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className='bg-slate-800 p-4 sticky top-0 
    drop-shadow-xl z-10'>
        <div className='prose prose-xl mx-auto flex justify-between flex-row'>
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
            <Link href="/"
            className="text-white/90 no-underline hover:text-white">
                Massify
            </Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                <Link className="flex" target="_blank" href="https://google.se"><FaLaptop></FaLaptop></Link>
                <Link className="flex" target="_blank" href="https://google.se"><FaLaptop></FaLaptop></Link>
            </div>
        </div>

    </nav>
  )
}
