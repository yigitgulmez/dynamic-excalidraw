'use client'
import { ProfileInfoTextProps } from '@/types';

export default function ProfileInfoText({text, data}:ProfileInfoTextProps) {
  return(
    <div className='py-2 px-4 bg-blue-600 rounded-xl w-max text-lg'>
      {text}{data}
    </div>
  )
}