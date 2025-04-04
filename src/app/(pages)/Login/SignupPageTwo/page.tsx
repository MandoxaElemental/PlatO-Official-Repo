import { ButtonBack, ButtonContinue, InputBoxes, InputPhone, TermsCheck } from '@/app/Components/LoginPageComponents'
import { Datepicker } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'

const SignupPage2 = () => {
  return (
    <>
        <div className='justify-items-center'>
            <Image src={`/assets/4.svg`} alt="logo" width={400} height={400}/>  
        </div>
        <div className='grid gap-3'>
            <InputPhone setFormtype='Phone Number'/>
            <Datepicker/>
            <TermsCheck/>
            <ButtonContinue pageLink='Login/SignupPageFour'/>
            <ButtonBack pageLink='SignupPageOne'/>
        </div>
    </>
  )
}

export default SignupPage2
