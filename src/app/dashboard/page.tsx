"use client";

import NavDash from "@/components/View/Dashboard/Navbar/NavDash";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineHelpOutline } from "react-icons/md";

interface Naskah{
  id: number;
  title: string;
  subTitle: string;
  keyword: string;
  prefiks: string;
  abstrak: string;
  file: string;
  createdAt: string;
  userName: string;
}

interface User {
  fullName: string;
  userName: string;
  lastName: string;
  email: string;
  afiliasi: string;
  country: string;
  createdAt: string;
  firstName: string;
  id: number;
  password: string;
}


export default function Dashboard() {
  const [userData, setUserData] = useState<User>({
    fullName: "",
    userName: "",
    lastName: "",
    email: "",
    afiliasi: "",
    country: "",
    createdAt: "",
    firstName: "",
    id: 0,
    password: "",
  });
  const [naskahData, setNaskahData] = useState<Naskah[]>([]);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session?.user) {
        const res = await fetch(`/api/user/${session.user.email}`);
        const data = await res.json();
        setUserData(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchNaskah() {
      try {
        const res = await fetch(`/api/naskah/${userData.id}`);
        const data = await res.json();
        setNaskahData(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNaskah();
  },[userData]);

  // console.log(userData.id)
  // console.log(naskahData)
  // console.log(userData)

  return (
    <>
      <NavDash userData={userData} />
      <div className="w-full bg-[#EAEDEE] h-screen">
        <h1 className="text-center text-xl">Naskah Masuk</h1>
        <div className="w-[70%] mx-auto mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <p>Antrianku</p>
              <p>Arsip</p>
            </div>
            <div className="flex items-center">
              <MdOutlineHelpOutline className="text-green-500" size={25} />
              <p>Bantuan</p>
            </div>
          </div>
          <div className="bg-white w-full p-4">
            <div className="flex justify-between items-center">
              <h1>Penugasan</h1>
              <div className="border border-primary p-2 rounded-sm hover:bg-primary hover:text-white transition-all text-sm">
                <Link href={"/naskah"}>New Naskah</Link>
              </div>
            </div>
            <hr className="border border-primary mt-4" />
            {naskahData.length > 0 ? (
              naskahData.map((naskah) => (
                <div
                  key={naskah.id}
                  className=" mt-4"
                >
                  <h1 className="text-lg font-bold">{naskah.title}</h1>
                  <p>{naskah.subTitle}</p>
                </div>
              ))
            ) : (
              <p className="text-center py-20">Belum ada naskah masuk</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
