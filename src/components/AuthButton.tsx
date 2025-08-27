'use client';
import { signIn } from 'next-auth/react';
import { AuthButtonProps } from '@/types';

export default function AuthButton({ provider, icon, label }: AuthButtonProps) {
    const styles = {
    github: 'shadow-black shadow-[0_0_15px_0]',
    gmail: 'shadow-red-600 shadow-[0_0_15px_0]',
  };
  return (
    <div
      onClick={() => signIn(provider)}
      className={`rounded-xl ${styles[provider]} cursor-pointer hover:scale-110 transition-all duration-500`}
    >
      <div className='px-8 py-2 flex gap-6 items-center'>
        <div className='text-5xl'>
          {icon}
        </div>
        <div className='w-px h-6 bg-white'></div>  
        <div className='text-xl'>
          {label}
        </div>
      </div>
    </div>
  );
}
