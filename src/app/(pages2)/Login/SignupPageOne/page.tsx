import { ButtonCancel, ButtonContinue, ButtonSignUpFB, ButtonSignUpGoogle, ButtonSignUpX, InputBoxes } from '@/app/Components/LoginPageComponents'
import Image from 'next/image'
import React from 'react'

const SignUpPage1 = () => {
  return (
    <>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>  
      </div>
    <div className='flex items-center justify-center'>
      <div className='grid gap-3'>
      
        <InputBoxes setFormtype='Name'/>
        <InputBoxes setFormtype='Username'/>
        <InputBoxes setFormtype='Email'/>
        <InputBoxes setFormtype='Password'/>
        <ButtonSignUpGoogle/>
        <ButtonSignUpFB/>
        <ButtonSignUpX/>
        <ButtonContinue pageLink='Login/SignupPageTwo'/>
        <ButtonCancel pageLink=''/>
      </div>
    </div>
  </>
  )
}

export default SignUpPage1
