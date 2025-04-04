import { ButtonCancel, ButtonLogin, ButtonLogInFB, ButtonLoginGoogle, ButtonLogInX, InputBoxes, RememberCheck } from '@/app/Components/LoginPageComponents'
import Image from 'next/image'
import React from 'react'

const LogInPage = () => {
  return (
    <>
        <div className='justify-items-center'>
            <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>  
        </div>
        <div className='grid gap-3'>
        <InputBoxes setFormtype='Username/Email'/>
        <InputBoxes setFormtype='Password'/>
        <RememberCheck/>
        <ButtonLogin pageLink='/Home'/>
        <ButtonCancel pageLink=''/>
        <ButtonLoginGoogle/>
        <ButtonLogInFB/>
        <ButtonLogInX/>
        </div>
    </>
  )
}

export default LogInPage
