'use client'

import { ButtonLogin, ButtonSignUp } from '@/app/Components/LoginPageComponents';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



const LoginPage = () => {

  const router = useRouter();

  useEffect(() => {
    const tokenCheck = localStorage.getItem("Token")

    if (tokenCheck) {
      router.push('/Home');
    }
  }, []);
  return (
    <>
    <div className='h-screen flex items-center justify-center'> 
      <div className='grid grid-cols-1 max-w-[80%] gap-3 align-self-center justify-self-center'>
        <div className='justify-items-center'>
          <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>  
        </div>
        <div>
          <div className='pt-50 w-100 flex-column justify-self-center'>
            <ButtonLogin pageLink='/Login/LoginPage'/>
            <ButtonSignUp/>
          </div>
        </div>
      </div>
    </div>
        
    </>
  )
}

export default LoginPage
