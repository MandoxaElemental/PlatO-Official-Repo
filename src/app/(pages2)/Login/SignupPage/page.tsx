"use client"

import { ButtonCancel} from '@/app/Components/LoginPageComponents'
import { createAccount } from '@/app/Utils/DataServices'
import { tagArr } from '@/app/Utils/Interfaces'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SignUpPage1 = () =>
{
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [switchBool, setSwitchBool] = useState(false);
  const [switchBool2, setSwitchBool2] = useState(false);

  const [badUsername, setBadUsername] = useState(false);
  const [badEmail, setBadEmail] = useState(false);

  const [noEmptyFieldsPageOne, setNoEmptyFieldsPageOne] = useState(true);
  const [noEmptyFieldsPageTwo, setNoEmptyFieldsPageTwo] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredCategories = tagArr;
    
  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const router = useRouter();

  const handleSwitch = () =>
  {
    setSwitchBool(!switchBool);
  }
  const handleSwitch2 = () =>
  {
    setSwitchBool2(!switchBool2);
  }

  const handleSubmit = async () =>
  {
    const userData = {
      email: email,
      username: username,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      interests: selectedTags
    }

    const result = await createAccount(userData);

    if (result)
    {
      localStorage.setItem("Username", username);
      alert("Account Created!");
      router.push("/Login/LoginPage");
    }else
    {
      alert("Username or Email already exists");
    }
  }

  const handleCheckBox = () =>
  {
    setIsChecked(!isChecked);
  }

  useEffect(() =>
  {
    if (username.includes("@"))
    {
      setBadUsername(true);
    }else
    {
      setBadUsername(false);
    }
  },[username])

  useEffect(() =>
  {
    if (email !== "")
    {
      if (!email.includes("@"))
      {
        setBadEmail(true);
      }else
      {
        setBadEmail(false);
      }
    }else
    {
      setBadEmail(false);
    }
  },[email])

  useEffect(() =>
  {
    if (email == "" || username == "" || password == "" || name == "")
    {
      setNoEmptyFieldsPageOne(true);
    }else
    {
      setNoEmptyFieldsPageOne(false);
    }
  },[email, username, password, name])

  useEffect(() =>
  {
    if (dateOfBirth == "")
    {
      setNoEmptyFieldsPageTwo(true);
    }else
    {
      setNoEmptyFieldsPageTwo(false);
    }
  },[phoneNumber, dateOfBirth])

  return (
  <>
    {/* SignupPageOne START */}
    <div className={`${switchBool ? "hidden" : ""}`}>
  <div className='flex justify-center mb-4'>
    <Image src={`/assets/4.svg`} alt="logo" width={300} height={300} />
  </div>

  <div className='flex items-center justify-center'>
    <div className='grid gap-3 w-full max-w-md'>
      {/* Name */}
      <div>
        <h1 className='text-gray-400'>Name*</h1>
        <TextInput onChange={(event) => setName(event.target.value)} type='text' />
      </div>

      <div>
        <div className="flex gap-5">
          <h1 className='text-gray-400'>Username*</h1>
          <h1 className={`text-red-500 italic ${badUsername ? "" : "hidden"}`}>Cannot Include &quot;@&quot;</h1>
        </div>
        <TextInput
          onChange={(event) => setUsername(event.target.value)}
          type='text'
          className={badUsername ? `outline-red-500 outline-[2px] rounded-[9px]` : ""}
        />
      </div>

      <div>
        <div className="flex gap-5">
          <h1 className='text-gray-400'>Email*</h1>
          <h1 className={`text-red-500 italic ${badEmail ? "" : "hidden"}`}>Must Include &quot;@&quot;</h1>
        </div>
        <TextInput
          onChange={(event) => setEmail(event.target.value)}
          type='text'
          className={badEmail ? `outline-red-500 outline-[2px] rounded-[9px]` : ""}
        />
      </div>

      <div>
        <h1 className='text-gray-400'>Password*</h1>
        <TextInput onChange={(event) => setPassword(event.target.value)} type='password' />
      </div>

      <div className='text-center text-blue-600 underline'>
        <Link href={"/Login/LoginPage"}>Already have an Account? Sign In Here</Link>
      </div>

      <div className='mt-5'>
        <Button
          onClick={handleSwitch}
          className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'
          disabled={(badUsername || noEmptyFieldsPageOne || badEmail)}
        >
          Continue
        </Button>
      </div>

      <div className="my-2 w-full">
        <ButtonCancel pageLink='' />
      </div>
    </div>
  </div>
</div>

    {/* SignupPageOne END */}

    {/* SignupPageTwo START */}
    <div className={`${switchBool && !switchBool2 ? "" : "hidden"}`}>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={300} height={300}/>
      </div>
      <div className='flex items-center justify-center'>
        <div className='grid gap-3'>
          <div>
            <h1 className=' text-gray-400'>Phone Number (optional)</h1>
            <TextInput onChange={(event) => setPhoneNumber(event.target.value)} type='text'/>
          </div>
          <div>
            <h1 className=' text-gray-400'>Date of Birth*</h1>
            <TextInput onChange={(event) => setDateOfBirth(event.target.value)} type='date'/>
          </div>
          <div className='flex justify-items-start space-x-2'>
            <Checkbox onChange={handleCheckBox} checked={!isChecked} id='rememberme'/>
            <Label htmlFor='rememberme' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>I have read and agreed to PlatO <a
  href="/Login/TermsOfService"
  onClick={(e) => {
    e.preventDefault();
    window.open(
      '/Login/TermsOfService',
      'TermsWindow',
      'width=600,height=700,resizable=yes,scrollbars=yes'
    );
  }}
  className='text-blue-500 hover:text-blue-300 focus:text-purple-500 underline'
>
  Terms and Conditions
</a></Label>
          </div>
          <div className='mb-1.5 mt-10'>
            <Button onClick={handleSwitch2} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200' disabled={(noEmptyFieldsPageTwo || isChecked) ? true : false}>Signup and Continue</Button>
          </div>
          <div className='mb-1.5'>
            <Button onClick={handleSwitch} className='rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>Back</Button>
          </div>
        </div>
      </div>
    </div>
    {/* SignupPageTwo END */}
    {/* SignupPageThree Start */}
    <div className={`${switchBool && switchBool2 ? "" : "hidden"}`}>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={300} height={300}/>
      </div>
      <div className='text-center text-lg font-semibold p-2'>Pick up to three Interests:</div>
      <div className='h-screen flex items-center flex-col'>
        <div className='w-screen-min'>                
          <div className="space-y-4 h-[300px] overflow-auto">
            {filteredCategories.map((cat, i) => (
              <div key={i}>
                <div className="grid md:grid-cols-5 grid-cols-3 gap-3">
                  {cat.tags.map((tag, j) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={j}
                        onClick={() => toggleTag(tag)}
                        className={`rounded-3xl border cursor-pointer h-10 w-28 ${
                          isSelected
                            ? 'bg-blue-400 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            className='my-5 rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'
            disabled={selectedTags.length < 3}
          >
            Continue
          </Button>
          <Button
            onClick={handleSubmit}
            className='my-5 rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  </>
  )
}

export default SignUpPage1