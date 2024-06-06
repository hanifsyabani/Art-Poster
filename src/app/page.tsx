"use client";

import LandingPage from "@/components/Layouts/LandingPage";
import Image from "next/image";
import poster1 from "@/assets/poster1.png";
import poster2 from "@/assets/poster2.png";
import poster3 from "@/assets/poster3.png";
import bg from "@/assets/bg.jpg";

import Header from "@/components/View/LandingPage/Header/Header";
import { team } from "@/components/View/LandingPage/Teams/TeamsItem";
import CardTeams from "@/components/View/LandingPage/Teams/CardTeams";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import React from "react";
import { FaqItem } from "@/components/View/LandingPage/Faq/FaqItem";

export default function Home() {
  return (
    <LandingPage>
      <div className="relative w-full py-14  bg-primary">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <div className="relative lg:flex w-full justify-center px-[3%] items-center pt-32">
          <div className="text-white lg:w-1/2">
            <p className="text-xl">Experience and Creativity</p>
            <h1 className="text-6xl font-bold my-3">
              Welcome to <span className="text-tersier">ArtPoster</span>
            </h1>
            <p className="max-w-lg">
              Explore the best posters from Fasilkom UNSRI. Course of operation
              system, data communication, and many more
            </p>

            <div className="flex gap-4">
              <button className="cssbuttons-io-button mt-8">
                Get started
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-1 gap-3 mt-10 lg:mt-0">
            <Image
              src={poster1}
              alt="poster1"
              width={160}
              height={160}
              className="-rotate-12 w-24 lg:w-44"
            />
            <Image
              src={poster2}
              alt="poster1"
              width={190}
              height={160}
              className="w-32 lg:w-44"
            />
            <Image
              src={poster3}
              alt="poster1"
              width={160}
              height={160}
              className="rotate-12 w-24 lg:w-44"
            />
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#3B1077"
          fill-opacity="1"
          d="M0,96L48,85.3C96,75,192,53,288,74.7C384,96,480,160,576,176C672,192,768,160,864,122.7C960,85,1056,43,1152,37.3C1248,32,1344,64,1392,80L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <section className="lg:-mt-20 px-[3%]">
        <Header title={"Recent Publication"} />
        <hr className="w-20 border-2 border-primary" />
        <div className="mt-10">
          <h1 className="lg:text-lg  font-bold hover:underline cursor-pointer">
            Vol 2 No 6 (2024): Student Poster Exhibition: Information System
            Bachelor Student (Bil) - Operating System Course{" "}
          </h1>
          <p className="text-sm">DITERBITKAN: 2024-05-18</p>
        </div>
      </section>

      <section className="mt-32 px-[3%]">
        <div className="text-center">
          <Header
            title="Meet Our Teams"
            subtitle="Let introduce with our team in ArtPoster"
          />
        </div>

        <div className="lg:flex justify-center items-center mt-10 gap-10">
          {team.map((item, index) => (
            <CardTeams key={index} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-32 px-[3%]">
        <Header title="FAQ" />
        <hr className="w-14 border-2 border-primary" />

        <div className="mt-7">
          <Accordion>
            {FaqItem.map((faq) => (
              <AccordionItem
                key={faq.title}
                aria-label="Accordion 1"
                title={faq.title}
              >
                {faq.deskripsi}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mt-32 px-[3%] pb-20">
        <div className="bg-primary lg:w-[80%] mx-auto relative rounded-md py-16">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${bg.src})` }}
          ></div>
          <div className="text-center p-4">
            <p className="text-white ">OUR SERVICE & EXPERTISE</p>
            <p className="lg:text-3xl text-xl text-white max-w-3xl mx-auto my-6 tracking-wide leading-10 font-extralight">
              Dive into the world of creativity with ArtPoster. Explore stunning
              posters, collaborate with like-minded individuals, and unleash
              your artistic potential.
            </p>
            <button className="bg-white text-secondary border border-tersier border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
              <span className="bg-primary shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Lets Started
            </button>
          </div>
        </div>
      </section>
    </LandingPage>
  );
}
