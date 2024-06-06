"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

interface FormValues {
  email: string;
  password: string;
}

const UserSchema = z.object({
  email : z.string({
    required_error: "Please enter your email",
  }).email("Invalid email format"),
  password : z.string({
    required_error: "Please enter your password",
  })
})

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [dataLogin, setDataLogin] = useState<FormValues>({
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDataLogin((old) => ({ ...old, [name]: value }));
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: dataLogin.email,
        password: dataLogin.password,
      });

      if (res?.error) {
        toast.error("Please check your email and password");
        setLoading(false);
      } else {
        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-1/2 h-full bg-primary m-auto px-5 py-20 rounded-xl ">
          <div className="text-center">
            <Link href={"/"}>
              <h1 className="text-4xl font-extrabold text-white ">
                -Art<span className="text-tersier">Poster</span>-
              </h1>
            </Link>
            <p className="text-gray-200 ">Please login to continue</p>
          </div>
          <form className="mt-10 w-1/2 mx-auto" onSubmit={handleLogin}>
            <Input
              type="email"
              label="Email"
              className="w-full"
              onChange={handleInput}
              name="email"
              id="email"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              id="password"
              className="w-full mt-4"
              onChange={handleInput}
            />
            <p className="underline text-gray-400 text-xs mt-4">
              Forget your password?
            </p>
            <div className="flex justify-center py-4">
              <button className="button" type="submit">
                {loading ? <Spinner className="text-white" /> : <p>Login</p>}
              </button>
            </div>
            <p className="text-gray-200 text-sm text-center">
              Not a member?{" "}
              <Link href={"/register"} className="text-tersier font-bold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
