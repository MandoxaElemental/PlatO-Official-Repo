import { ButtonContinue, ButtonPreferences } from '@/app/Components/LoginPageComponents'
import Image from 'next/image'
import React from 'react'

const SignUpPage4 = () => {
  return (
    <>
      <div className='justify-items-center'>
          <Image src={`/assets/4.svg`} alt="logo" width={200} height={200}/>  
      </div>
      <div className='grid md:grid-cols-5 grid-cols-3 gap-5'>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>
          <ButtonPreferences imageDescription='Test' imageSrc='/assets/burger.png'/>

      </div>
      <ButtonContinue pageLink='Home'/>
    </>
  )
}

export default SignUpPage4
