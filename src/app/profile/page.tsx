'use client'
import { ProfileButton, ProfileInfoText, ProfileRadioButton, ProfileTextInput } from '@/components';
import { SiGmail, SiGithub } from 'react-icons/si';
import { useSession } from "next-auth/react";
import Image from 'next/image'


export default function profile() {
  const { data: session } = useSession();
  const container_bg = 'rounded-2xl bg-[#9796a5] w-full h-full';
  const content = 'flex flex-col gap-5';

  return (
    <main 
      className='flex flex-col items-center justify-items-center h-screen 
      from-[#7e7d94] to-[#3b3a4a] bg-radial-[at_50%_75%]'>
      <div className='p-20 w-full h-full flex justify-center items-center gap-10'>
        <div className={`${container_bg} flex-3 flex flex-col justify-start items-center`}>
          <div className='flex flex-col items-center'>
            <div className='mt-10'>
              <Image
                className='ring-4 ring-indigo-600 rounded-full select-none'
                src={'https://avatar.iran.liara.run/public/5'}
                width={200}
                height={200}
                alt='Profile'
                />
            </div>
            <div className='mt-5 text-3xl py-2 px-4 bg-indigo-600 rounded-xl'>
              {session?.user?.username}
            </div>
          </div>
          <div className='h-full w-full text-xl mt-10 ms-10 flex flex-col gap-8'>
            <ProfileInfoText text='All Documents: ' />
            <ProfileInfoText text='All Files: ' />
            <ProfileInfoText text='Storage Used: ' />
            <ProfileInfoText text='Creation Date: ' />
          </div>
        </div>
        <div className={`${container_bg} flex-8 text-xl p-10 flex`}>
          <div className='flex flex-col flex-1 justify-around'>
            <div className={content}>
              <ProfileTextInput text='Username' data={session?.user.username}/>
              <ProfileTextInput text='Name' data={session?.user.name}/>
              <ProfileTextInput text='Email' data={session?.user.email}/>
            </div>
            <div className={content}>
              <ProfileInfoText text='Githup: '/>
              <ProfileInfoText text='Gmail: '/>
            </div>
            <div className={content}>
              <ProfileButton text='Download All Data' />
              <ProfileButton text='Delete All Data' />
              <ProfileButton text='Support' 
                onClick={function support(){window.open('https://yigitgulmez.com/en/contact')}}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col items-center mt-16'>
            <div className={`${content} items-center`}>
              <div className='flex gap-10'>
                <ProfileRadioButton icon={<SiGithub />} status={true} />
                <ProfileRadioButton icon={<SiGmail />} status={false} />
              </div>
              <div className='text-base bg-indigo-600 rounded-xl py-2 px-3'>
                Synchronizing with xxxx 
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
