"use client"

import { ButtonCancel, ButtonLogin, ButtonLogInFB, ButtonLoginGoogle, ButtonLogInX, InputBoxes, RememberCheck } from '@/app/Components/LoginPageComponents'
import { login } from '@/app/Utils/DataServices';
import { TextInput } from 'flowbite-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LogInPage = () =>
{
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async () =>
  {
    if (usernameOrEmail.includes('@'))
    {
      setEmail(usernameOrEmail);
    }
    else
    {
      setUsername(usernameOrEmail);
    }

    let userData = {
      email: email,
      username: username,
      password: password,
    }
  
    let result = await login(userData);
  
    result ? (alert("Log In Successful!"), router.push("/Home")) : alert("Username/Email or Password is incorrect");
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
          <TextInput onChange={(event) => setUsernameOrEmail(event.target.value)} type='text' min={6} max={20}/>
        </div>
        <div>
          <h1 className=' text-gray-400'>Password</h1>
          <TextInput onChange={(event) => setPassword(event.target.value)} type='text' min={6} max={20}/>
        </div>
        <RememberCheck/>
        <ButtonLogin pageLink='/Home'/>
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
