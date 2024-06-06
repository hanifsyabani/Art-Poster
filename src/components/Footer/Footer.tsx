import logo from '@/assets/logo.svg'
import Image from 'next/image'

export default function Footer(){
  return(
    <footer className="bg-primary py-10">
      <div className="flex justify-center gap-20 ">
        <div>
          <div className='flex items-center gap-2'>
            <Image src={logo} alt='logo' width={30} height={30}/>
            <h1 className='text-white'>ArtPoster</h1>
          </div>
          <p className='text-sm text-tersier'>acmstudent@unsri.ac.id</p>
        </div>
        <div>
          <h1 className='text-white font-bold'>Quick Links</h1>
          <ul className='text-white text-sm mt-4'>
            <li className='mb-2'>Poster</li>
            <li className='mb-2'>Information</li>
            <li className='mb-2'>Company</li>
          </ul>
        </div>
      </div>
      
    </footer>
  )
}