"use client";

import { ArsipItem } from "@/components/Archive/ArsipItem";
import LandingPage from "@/components/Layouts/LandingPage";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Naskah {
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

export default function Jurusan() {
  const params = useParams();
  const [naskahByMajor, setNaskahByMajor] = useState<Naskah[]>([]);

  const filter = (major: any) => {
    return ArsipItem.filter((arsip) => arsip.major === major);
  };

  useEffect(() => {
    async function fetchNaskah() {
      const res = await fetch(`/api/major/${params.jurusan}`);
      const data = await res.json();
      setNaskahByMajor(data);
    }

    fetchNaskah();
  }, [params.jurusan]);

  const fillteredItem = filter(params.jurusan);

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <LandingPage>
      <div className="px-[5%] py-28">
        {fillteredItem.map((arsip) => (
          <h1 className="text-4xl font-bold " key={arsip.id}>
            {arsip.name}
          </h1>
        ))}
        <p className="pt-2">Diterbitkan : </p>
        <div className="w-20">
          <h1 className="text-primary text-xl font-semibold mt-10">Artikel</h1>
          <hr className="border-2 border-tersier" />
        </div>
        {naskahByMajor.map((naskah) => (
          <div className="flex gap-10 mt-10 mb-4">
            <Image src={naskah.file} alt={"poster"} width={200} height={200} />
            <div>
              <Link
                href={`/naskah/${naskah.id}`}
                className="hover:opacity-60 transition-all"
              >
                <h1 className="text-xl font-bold text-primary">
                  {naskah.title}
                </h1>
              </Link>
              <p>{getText(naskah.abstrak)}</p>
              <button className="bg-tersier border border-tersier px-4 py-2 rounded-md text-sm mt-4 hover:border hover:border-tersier hover:bg-white hover:text-tersier transition-all">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </LandingPage>
  );
}
