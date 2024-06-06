"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

type FormValues = {
  firstName: string;
  lastName: string;
  afiliasi: string;
  country: string;
  email: string;
  userName: string;
  password: string;
  confPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(5, "First name must be at least 5 characters")
      .max(20, "First name must be at most 20 characters"),

    lastName: z.string({
      required_error: "Please enter your last name",
    }),
    afiliasi: z.string({
      required_error: "Please enter your affiliation",
    }),
    country: z.string({
      required_error: "Please enter your country",
    }),
    email: z.string().email("Invalid email format"),

    userName: z.string().min(5, "Username must be at least 5 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confPassword: z.string(),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords must match",
    path: ["confPassword"],
  });

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState<FormErrors>({});
  const [value, setValue] = useState<FormValues>({
    firstName: "",
    lastName: "",
    afiliasi: "",
    country: "",
    email: "",
    userName: "",
    password: "",
    confPassword: "",
  });

  function handleInput(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setValue((old) => ({ ...old, [name]: inputValue }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedUser = UserSchema.parse(value);

      setFormError({});

      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        toast.success("Register successfull", {
          position: "top-right",
        });
        router.push("/login");
      } else {
        setLoading(false);
        toast.error("Register failed", {
          position: "top-right",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormError(error.formErrors.fieldErrors);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-[80%] bg-primary m-auto px-[5%] py-4 rounded-xl ">
          <div className="text-center">
            <Link href={"/"}>
              <div className="flex items-center gap-2 justify-center">
                <Image src={logo} alt="logo" />
                <h1 className="text-4xl font-extrabold text-white ">
                  Art<span className="text-tersier">Poster</span>
                </h1>
              </div>
            </Link>
            <p className="text-gray-200 ">Register </p>
          </div>
          <form className="mt-10 " onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-6 ">
              <div className="w-1/2">
                <h1 className="text-xl text-white font-extrabold">Profile</h1>
                <div className="mt-2">
                  <Input
                    type="text"
                    label="First Name"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="firstName"
                    id="firstName"
                    onChange={handleInput}
                  />
                  {formError?.firstName && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.firstName}
                    </p>
                  )}
                  <Input
                    type="text"
                    label="Last Name"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="lastName"
                    id="lastName"
                    onChange={handleInput}
                  />
                  {formError?.lastName && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.lastName}
                    </p>
                  )}
                  <Input
                    type="text"
                    label="Afiliasi"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="afiliasi"
                    id="afiliasi"
                    onChange={handleInput}
                  />
                  {formError?.afiliasi && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.afiliasi}
                    </p>
                  )}
                  <Input
                    type="text"
                    label="Country"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="country"
                    id="country"
                    onChange={handleInput}
                  />
                  {formError?.country && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.country}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="text-xl text-white font-extrabold">Login</h1>
                <div className="mt-2">
                  <Input
                    type="email"
                    label="Email"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="email"
                    id="email"
                    onChange={handleInput}
                  />
                  {formError?.email && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.email}
                    </p>
                  )}
                  <Input
                    type="text"
                    label="Username"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="userName"
                    id="userName"
                    onChange={handleInput}
                  />
                  {formError?.userName && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.userName}
                    </p>
                  )}
                  <Input
                    type="password"
                    label="Password"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="password"
                    id="password"
                    onChange={handleInput}
                  />
                  {formError?.password && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.password}
                    </p>
                  )}
                  <Input
                    type="password"
                    label="Confirm Password"
                    className={`${formError?.firstName ? "mb-1" : "mb-3"}`}
                    name="confPassword"
                    id="confPassword"
                    onChange={handleInput}
                  />
                  {formError?.confPassword && (
                    <p className="text-xs text-red-500 font-semibold">
                      {formError?.confPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center py-4">
              <button className="button" type="submit">
                {loading ? <Spinner /> : <p>Register</p>}
              </button>
            </div>
            <p className="text-gray-200 text-sm text-center">
              Have an account?{" "}
              <Link href={"/login"} className="text-tersier font-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
