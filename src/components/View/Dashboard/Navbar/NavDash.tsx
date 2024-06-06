import Link from "next/link";
import LogoutButton from "../ButtonLogout/LogoutButton";
import logo from '@/assets/logo.svg'
import Image from "next/image";

export default function NavDash({userData} : any) {
  return (
    <div className="flex justify-between items-center bg-secondary px-4 py-3">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={30} height={30}/>
        <h1 className="text-white text-xl">ArtPoster</h1>
      </Link>
      <div className="flex items-center gap-6">
        <h1 className="text-white">{userData?.name}</h1>
        <LogoutButton/>
      </div>
    </div>
  )
}