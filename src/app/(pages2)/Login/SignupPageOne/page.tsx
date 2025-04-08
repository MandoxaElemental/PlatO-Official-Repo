"use client"

import { ButtonCancel, ButtonSignUpFB, ButtonSignUpGoogle, ButtonSignUpX, TermsCheck } from '@/app/Components/LoginPageComponents'
import { createAccount } from '@/app/Utils/DataServices'
import { Button, TextInput } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUpPage1 = () =>
{
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [switchBool, setSwitchBool] = useState(false);

  const router = useRouter();

  const handleSwitch = () =>
  {
    setSwitchBool(!switchBool);
  }

  const handleSubmit = async () =>
  {
    const userData = {
      email: email,
      username: username,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth
    }

    const result = await createAccount(userData);

    if (result)
    {
      alert("Account Created!");
      router.push("/Login/SignupPageFour");
    }else
    {
      alert("Username or Email already exists");
    }
  }

  return (
  <>
    {/* SignupPageOne START */}
    <div className={`${switchBool ? "hidden" : ""}`}>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='grid gap-3'>
          <div>
            <h1 className=' text-gray-400'>Name</h1>
            <TextInput onChange={(event) => setName(event.target.value)} type='text'/>
          </div>
          <div>
            <h1 className=' text-gray-400'>Username</h1>
            <TextInput onChange={(event) => setUsername(event.target.value)} type='text'/>
          </div>
          <div>
            <h1 className=' text-gray-400'>Email</h1>
            <TextInput onChange={(event) => setEmail(event.target.value)} type='text'/>
          </div>
          <div>
            <h1 className=' text-gray-400'>Password</h1>
            <TextInput onChange={(event) => setPassword(event.target.value)} type='text'/>
          </div>
          <ButtonSignUpGoogle/>
          <ButtonSignUpFB/>
          <ButtonSignUpX/>
          <div className='mb-1.5 mt-10'>
            <Button onClick={handleSwitch} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer'>Continue</Button>
          </div>
          <ButtonCancel pageLink=''/>
        </div>
      </div>
    </div>
    {/* SignupPageOne END */}

    {/* SignupPageTwo START */}
    <div className={`${switchBool ? "" : "hidden"}`}>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='grid gap-3'>
          <div>
            <h1 className=' text-gray-400'>Phone Number</h1>
            <TextInput onChange={(event) => setPhoneNumber(event.target.value)} type='text'/>
          </div>
          <div>
            <h1 className=' text-gray-400'>Date of Birth</h1>
            <TextInput onChange={(event) => setDateOfBirth(event.target.value)} type='date'/>
          </div>
          <TermsCheck/>
          <div className='mb-1.5 mt-10'>
            <Button onClick={handleSubmit} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer p-0'>Signup and Continue</Button>
          </div>
          <div className='mb-1.5'>
            <Button onClick={handleSwitch} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer'>Back</Button>
          </div>
        </div>
      </div>
    </div>
    {/* SignupPageTwo END */}
  </>
  )
}

export default SignUpPage1