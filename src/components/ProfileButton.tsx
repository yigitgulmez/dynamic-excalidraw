'use client'
import { ProfileButtonProps } from '@/types';
import { LuMousePointerClick } from 'react-icons/lu';
export default function ProfileButton({text, onClick}:ProfileButtonProps) {
  return(
    <div 
      className='py-2 px-4 gap-5 flex justify-between bg-blue-600 
      rounded-xl w-max text-lg cursor-pointer hover:scale-105 transition-all'
      onClick={onClick}
    >
      {text}
      <span className='text-2xl'>
        <LuMousePointerClick/>
      </span>
    </div>
  )
}