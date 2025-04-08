"use client"

import { ButtonCancel, ButtonLogInFB, ButtonLoginGoogle, ButtonLogInX, RememberCheck } from '@/app/Components/LoginPageComponents'
import { getUserInfoByEmail, getUserInfoByUsername, login } from '@/app/Utils/DataServices';
import { IToken } from '@/app/Utils/Interfaces';
import { Button, TextInput } from 'flowbite-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LogInPage = () =>
{
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async () =>
  {
    let email = "";
    let username = "";

    if (usernameOrEmail.includes("@"))
    {
      console.log('second')
      email = usernameOrEmail;
    }

    if (!usernameOrEmail.includes("@"))
    {
      console.log('first')
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

        if (username != "")
        {
          await getUserInfoByUsername(username);
        }else
        {
          await getUserInfoByEmail(email);
        }
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
          <TextInput onChange={(event) => setPassword(event.target.value)} type='text'/>
        </div>
        <RememberCheck/>
        <div className='mb-3'>
          <Button onClick={handleSubmit} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer'>Login</Button>
        </div>
        <ButtonCancel pageLink=''/>
        <ButtonLoginGoogle/>
        <ButtonLogInFB/>
        <ButtonLogInX/>
        </div>
      </div>
    </>
  )
}

export default LogInPage