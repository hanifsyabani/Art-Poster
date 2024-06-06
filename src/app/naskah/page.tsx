"use client";

import NavDash from "@/components/View/Dashboard/Navbar/NavDash";
import {
  Button,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCloudDone } from "react-icons/md";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

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
  role: string | null;
}

export default function Naskah() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    role: null,
  });
  const [title, setTitle] = useState("");
  const [abstrak, setAbstrak] = useState("");
  const [prefiks, setPrefiks] = useState("");
  const [file, setFile] = useState<File>();
  const [subTitle, setSubTitle] = useState("");
  const [keyword, setKeyword] = useState("");

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("abstrak", abstrak);
      formData.append("prefiks", prefiks);
      formData.append("subTitle", subTitle);
      formData.append("keyword", keyword);
      formData.append("file", file);

      const res = await fetch(`/api/naskah/${userData.id}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Naskah has been uploaded");
        router.push("/dashboard");
      } else {
        toast.error("Please check your file");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error when uploading file");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavDash />
      <div className="flex gap-1 items-center bg-secondary text-white px-4 cursor-pointer">
        <IoMdArrowRoundBack size={25} onClick={() => router.back()} />
        <p className="text-xs">Back to Dashboard</p>
      </div>
      <div className="bg-[#EAEDEE]  px-[5%]">
        <h1 className="py-6 text-center text-xl font-bold">Unggah Naskah</h1>
        <div className="bg-white w-[80%] mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <p>File</p>
              <div className="border border-primary p-2 rounded-sm cursor-pointer hover:bg-primary hover:text-white transition-all">
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  style={{ display: "none" }}
                />
                <label htmlFor="file" className="cursor-pointer text-sm">
                  Upload File
                </label>
              </div>
            </div>
            <hr className="border border-primary mt-4" />
            {/* {file?.type ? file.} */}
            <p className="text-center py-20">
              {file?.name ? file.name : "No file selected"}
            </p>

            <div className="flex gap-3 mb-4  justify-center">
              <div className="w-full">
                <Input
                  type="text"
                  name="prefiks"
                  id="prefiks"
                  label="Prefiks"
                  className="w-full"
                  onChange={(e) => setPrefiks(e.target.value)}
                />
                <label className="text-xs">Example: A, the</label>
              </div>
              <div className="w-full">
                <Input
                  name="title"
                  id="title"
                  type="text"
                  label="Title"
                  className="w-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <Input
              name="subTitle"
              id="subTitle"
              label="Sub title"
              className="mb-4"
              onChange={(e) => setSubTitle(e.target.value)}
            />
            <ReactQuill
              theme="snow"
              className="h-64 mb-20"
              value={abstrak}
              onChange={(e) => setAbstrak(e)}
            />

            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>Afiliasi</TableColumn>
                <TableColumn>Dalam daftar pencarian</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>
                    {`${userData.firstName} ${userData.lastName}`}{" "}
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.afiliasi}</TableCell>
                  <TableCell>
                    {userData && (
                      <MdCloudDone size={20} className="text-green-500" />
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Input
              type="text"
              label="Enter the keyword"
              name="keyword"
              id="keyword"
              className="mt-4"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex justify-center items-center mt-4">
              <Button type="submit">{loading ? <Spinner /> : "Submit"}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
