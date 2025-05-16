"use client"

import { ButtonCancel, RememberCheck } from '@/app/Components/LoginPageComponents'
import { getUserInfoByEmail, getUserInfoByUsername, login } from '@/app/Utils/DataServices';
import { IToken } from '@/app/Utils/Interfaces';
import { Button, TextInput } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LogInPage = () =>
{
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async () =>
  {

    const isEmail = usernameOrEmail.includes("@");
    let email = "";
    let username = "";

    if (usernameOrEmail.includes("@"))
    {
      email = usernameOrEmail;
    }

    if (!usernameOrEmail.includes("@"))
    {
      username = usernameOrEmail;
    }
    

    const userData = {
      email: email,
      username: username,
      password: password,
    }
  
    const token: IToken = await login(userData);

    if (token != null)
    {
      if (typeof window != null)
      {
        localStorage.setItem("Token", token.token);

        const userInfo = isEmail
        ? await getUserInfoByEmail(email)
        : await getUserInfoByUsername(username);

        localStorage.setItem("UserID", userInfo.id.toString());
        localStorage.setItem("Username", userInfo.username);
        
        alert("Log In Successful!");
        
        router.push("/Home");
      }
    }else
    {
      alert("Username/Email or Password is incorrect");
    }
  }

  return (
    <>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>  
      </div>
      <div className='flex items-center justify-center'>
        <div className='grid gap-3'>
        <div>
          <h1 className=' text-gray-400'>Username/Email</h1>
          <TextInput onChange={(event) => setUsernameOrEmail(event.target.value)} type='text'/>
        </div>
        <div>
          <h1 className=' text-gray-400'>Password</h1>
          <TextInput onChange={(event) => setPassword(event.target.value)} type='password'/>
        </div>
        <RememberCheck/>
        <div className='text-blue-600 underline'><Link href={"/Login/SignupPage"}>Don&apos;t have an Account? Sign Up Here</Link></div>
        <div className='mb-3'>
          <Button onClick={handleSubmit} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer'>Login</Button>
        </div>
        <ButtonCancel pageLink=''/>
        {/* <ButtonLoginGoogle/>
        <ButtonLogInFB/>
        <ButtonLogInX/> */}
        </div>
      </div>
    </>
  )
}

export default LogInPage