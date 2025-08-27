'use client'
import { ProfileRadioButtonProps } from '@/types';

export default function ProfileRadioButton({ icon, status }:ProfileRadioButtonProps) {
  return(
    <div 
      className={`text-6xl cursor-pointer ${status ? 'text-indigo-600' : 'text-gray-500'}`}
    >
      {icon}
    </div>  
  )
}