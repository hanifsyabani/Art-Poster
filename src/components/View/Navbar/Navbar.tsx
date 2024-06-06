import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import ButtonNav from "./ButtonNav";
import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { Avatar, Listbox, ListboxItem } from "@nextui-org/react";
import { navitem } from "./NavItem";

export default function Navbar() {
  const [userData, setUserData] = useState<{
    name?: string | null;
    email?: string | null;
    afiliasi?: string | null;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const height = window.innerHeight;

      if (scrollTop > height * 0.9) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (session?.user) {
        setUserData(session.user);
      }
    }

    fetchData();
  }, []);

  async function handleLogout() {
    await signOut();
    window.location.reload();
  }

  return (
    <nav
      className={`flex justify-between items-center px-10 py-4 fixed w-full z-50 ${
        scrolled ? "bg-white shadow-xl" : "bg-primary"
      } transition-all z-50`}
    >
      <div className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={30} height={30} />
        <h1 className="text-xl text-tersier font-extrabold">
          Art{" "}
          <span className={`${scrolled ? "text-primary" : "text-white"}`}>
            Poster
          </span>
        </h1>
      </div>
      <ul
        className={`flex items-center gap-6 font-semibold ${
          scrolled ? "text-primary" : "text-white"
        } `}
      >
        {navitem.map((item) => (
          <Link href={item.link} key={item.id}>
            <li className="cursor-pointer hover:text-tersier transition-all">
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex gap-10 items-center">
        {userData ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar onClick={() => setOpenProfile(!openProfile)} />
            <p className={`${scrolled ? "text-primary" : "text-white"} `}>
              {userData.name}
            </p>
          </div>
        ) : (
          <>
            <Link href={"/login"}>
              <ButtonNav title="Login" />
            </Link>
            <Link href={"/register"}>
              <ButtonNav title="Register" />
            </Link>
          </>
        )}
      </div>

      <div
        className={`absolute ${
          openProfile ? "top-20" : "-top-[200%]"
        } right-10 transition-all ${
          scrolled ? "bg-primary text-white" : "bg-white"
        }`}
      >
        <Listbox aria-label="Actions">
          <ListboxItem key="new">Profile</ListboxItem>
          <ListboxItem key="dashboard">
            <Link href={"/dashboard"}>Dashboard</Link>
          </ListboxItem>
          <ListboxItem key="edit" onClick={handleLogout}>
            Log out
          </ListboxItem>
        </Listbox>
      </div>
    </nav>
  );
}
