
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

//For these buttons, you could probably add an extra component that will let you manipulate where the href takes you
type buttonHREF = {
    pageLink: string;
}

const ButtonLogin = ({ pageLink }: buttonHREF) => {
  return (
    <div className='mb-3'>
        <Link href={`${pageLink}`}>
            <Button className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>
                Login
            </Button>
        </Link>
            </div>
    )
}

const ButtonSignUp = () => {
    return (
        <div className='mb-3'>
            <Link href="/Login/SignupPage">
                <Button className='rounded-md bg-transparent hover:bg-transparent text-blue-200 hover:text-blue-400 border-4 border-blue-200 hover:border-blue-400 w-full cursor-pointer dark:bg-transparent dark:hover:bg-transparent dark:border-blue-100 dark:hover:border-blue-200'>
                    Sign Up
                </Button>
            </Link>
        </div>
    )
}

const ButtonForgotPassword = () =>
{
    return (
        <div>
            <Button className='text-blue-200 hover:text-blue-400 p-0 bg-transparent hover:bg-transparent w-full '>
                <h1>Forgot Password?</h1>
            </Button>
        </div>
    )
}

const ButtonSignUpGoogle = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 w-full grid grid-cols-3 my-1.5'>
                <h1 className='col-span-2 text-start'>Sign Up Using Gmail</h1>
                <Image src={"/assets/google.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert'/>
            </Button>
        </div>
    )
}

const ButtonLoginGoogle = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 w-full grid grid-cols-3 my-1.5'>
                <h1 className='col-span-2 text-start'>Log In Using Gmail</h1>
                <Image src={"/assets/google.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert'/>
            </Button>
        </div>
    )
}

const ButtonSignUpFB = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 w-full grid grid-cols-3 my-1.5'>
                <h1 className='col-span-2 text-start'>Sign Up Using Facebook</h1>
                <Image src={"/assets/facebook.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert cursor-pointer'/>
            </Button>
        </div>
    )
}

const ButtonLogInFB = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 w-full grid grid-cols-3 my-1.5'>
                <h1 className='col-span-2 text-start'>Log In Using Facebook</h1>
                <Image src={"/assets/facebook.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert cursor-pointer'/>
            </Button>
        </div>
    )
}

const ButtonSignUpX = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 w-full grid grid-cols-3 my-1.5'>
              <h1 className='col-span-2 text-start dark:text-black'>Sign Up Using X</h1>
              <Image src={"/assets/twitter-x.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert dark:invert-0 cursor-pointer'/>
            </Button>
        </div>
    )
}

const ButtonLogInX = () => {
    return (
        <div className='justify-items-center'>
            <Button className='bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 w-full grid grid-cols-3 my-1.5'>
              <h1 className='col-span-2 text-start dark:text-black'>Log In Using X</h1>
              <Image src={"/assets/twitter-x.svg"} alt='icon-google' width={30} height={30} className='justify-self-end invert dark:invert-0 cursor-pointer'/>
            </Button>
        </div>
    )
}


const ButtonContinue = ({ pageLink }: buttonHREF) => {
    return (
        <div className='mb-1.5 mt-10'>
            <Link href={`/${pageLink}`}>
                <Button className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>
                Continue
                </Button>
            </Link>
          </div>
    )
} 

const ButtonCancel = ({ pageLink }: buttonHREF) => {
    return (
        <div className='mb-1.5'>
            <Link href={`/Login/${pageLink}`}>
                <Button className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>
                    Cancel
                </Button>
            </Link>
          </div>
    )
} 

const ButtonBack = ({ pageLink }: buttonHREF) => {
    return (
        <div className='mb-1.5'>
        <Link href={`/Login/${pageLink}`}>
            <Button className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>
                Back
            </Button>
        </Link>
      </div>
    )
}

type ButtonPreferencesProps = {
    imageDescription: string
}

const ButtonPreferences = ({ imageDescription}: ButtonPreferencesProps) => {
    return (
        <div className='flex justify-center items-center h-25 w-28 rounded-3xl bg-transparent '>
            <h1 className=' text-white absolute font-extrabold text-lg'>{imageDescription}</h1>
        </div>
    )
}

type InputBoxesProps = {
    setFormtype: string;
}

const InputBoxes = ({ setFormtype }: InputBoxesProps) => {
    return(
        <div>
            <h1 className=' text-gray-400'>{setFormtype}</h1>
            <TextInput type='text' min={6} max={20} className=''/>
        </div>
    )
}

const InputPhone = ({ setFormtype }: InputBoxesProps) => {
    //setVar can be used to set the variable for usernames, passwords, etc, to be salt and hash'd
    return(
        <div>
            <h1 className=' text-gray-400'>{setFormtype}</h1>
            <TextInput type='tel'/>
        </div>
    )
}

const RememberCheck = () => {
    return (
        <div className='flex justify-items-start space-x-2'>
            <Checkbox id='rememberme'/>
            <Label htmlFor='rememberme' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Stay Signed In</Label>
        </div>
    )
}

const TermsCheck = () => {
    return (
        <div className='flex justify-items-start space-x-2'>
            <Checkbox id='rememberme'/>
            <Label htmlFor='rememberme' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>I have read and agreed to PlatO <Link href='/' className='text-blue-500 hover:text-blue-300 focus:text-purple-500 underline'>Terms and Conditions</Link></Label>
        </div>
    )
}


export { ButtonLogin, ButtonSignUp, ButtonForgotPassword, ButtonSignUpGoogle, ButtonSignUpFB, ButtonSignUpX, ButtonContinue, ButtonCancel, ButtonBack, ButtonPreferences, InputBoxes, RememberCheck, ButtonLoginGoogle, ButtonLogInFB, ButtonLogInX, TermsCheck, InputPhone }
