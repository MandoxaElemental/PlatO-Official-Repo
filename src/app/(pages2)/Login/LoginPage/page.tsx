"use client";

import {
  ButtonCancel,
  RememberCheck,
} from "@/app/Components/LoginPageComponents";
import { login } from "@/app/Utils/DataServices";
import { Button, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LogInPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const identifier = usernameOrEmail.trim();

    if (!identifier || !password) {
      alert("Please enter your email and password.");
      return;
    }

    if (!identifier.includes("@")) {
      alert(
        "Username login is not connected yet. Please sign in using your email address.",
      );
      return;
    }

    const result = await login({
      email: identifier,
      username: "",
      password,
    });

    if (result.success && result.user) {
      localStorage.setItem("UserID", result.user.id);
      localStorage.setItem(
        "Username",
        result.user.user_metadata?.username ?? identifier,
      );

      // Supabase manages the authentication session.
      // Do not store a fake or legacy backend token here.
      localStorage.removeItem("Token");

      alert("Log In Successful!");
      router.push("/Home");
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div className="justify-items-center px-2">
        <Image src={`/assets/4.svg`} alt="logo" width={400} height={400} />
      </div>
      <div className="flex items-center justify-center">
        <div className="grid gap-3">
          <div>
            <h1 className=" text-gray-400">Username/Email</h1>
            <TextInput
              onChange={(event) => setUsernameOrEmail(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <h1 className=" text-gray-400">Password</h1>
            <TextInput
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
          <RememberCheck />
          <div className="text-blue-600 underline">
            <Link href={"/Login/SignupPage"}>
              Don&apos;t have an Account? Sign Up Here
            </Link>
          </div>
          <div className="mb-3 space-y-2">
            <Button
              onClick={handleSubmit}
              className="rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                localStorage.setItem("Token", "guest-token");
                localStorage.setItem("UserID", "0");
                localStorage.setItem("Username", "Guest");

                alert("Logged in as Guest");
                router.push("/Home");
              }}
              className="rounded-md bg-gray-300 hover:bg-gray-500 text-black w-full cursor-pointer"
            >
              Continue as Guest
            </Button>
          </div>
          <ButtonCancel pageLink="" />
          {/* <ButtonLoginGoogle/>
        <ButtonLogInFB/>
        <ButtonLogInX/> */}
        </div>
      </div>
    </>
  );
};

export default LogInPage;
