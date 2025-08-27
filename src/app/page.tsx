import { AuthButton } from '@/components';
import { SiGmail, SiGithub } from 'react-icons/si';


export default function Home() {
  return (
    <main className='flex flex-col items-center justify-items-center h-screen from-[#7e7d94] to-[#3b3a4a] bg-radial-[at_50%_75%]'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center rounded-2xl border-2 border-[#3e3d53] shadow-[#3e3d53] shadow-[0_0_20px_0]'>
          <div className='flex flex-col justify-center items-center py-10 px-20 gap-16'>
            <h1 className='text-4xl'>
              Log-in
            </h1>
            <div className='flex flex-col gap-6'>
              <AuthButton icon={<SiGithub />} provider='github' label='GitHub'/>
              <AuthButton icon={<SiGmail />} provider='gmail' label='Gmail'/>
            </div>
            <a
              className='text-white hover:text-[#a8a5ff] hover:drop-shadow-[0_0_5px_#a8a5ff] transition-all duration-500'
              href='https://yigitgulmez.com'
              target='_blank'
              rel='noopener noreferrer'
              >
              © 2025 Yiğit Gülmez
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
