"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <>
      <button
        className="text-white bg-tersier px-4 py-2 rounded-full hover:bg-white hover:text-primary transition-all "
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
}
