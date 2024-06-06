"use client";

import { ArsipItem } from "@/components/Archive/ArsipItem";
import LandingPage from "@/components/Layouts/LandingPage";
import Link from "next/link";

export default function Archive() {
  return (
    <LandingPage>
      <div className="pt-20 px-[5%] mx-auto">
        <h1 className="text-3xl font-bold mb-5">Arsip</h1>
        <div>
          {ArsipItem.map((arsip) => (
            <div key={arsip.id} className="mb-10">
              <Link href={`/archive/${arsip.major}`}  >
                <h1 className="text-lg text-primary font-extrabold hover:underline">
                  {arsip.name}
                </h1>
                <p>{arsip.volume}</p>
              </Link>
            </div>
          ))}
          <h1></h1>
        </div>
      </div>
    </LandingPage>
  );
}
