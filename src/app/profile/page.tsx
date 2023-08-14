"use client";

import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [id, setId] = useState("nothing");
  async function onLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/login");
    } catch (error: any) {
      return NextResponse.json(
        {
          message: "Error Logging out",
        },
        { status: 500 }
      );
    }
  }

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setId(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>This is the Profile Page</h1>
      <h2 className="p-1 rounded bg-green-500">{id === "nothing" ? "Nothing" : <Link href={`/profile/${id}`}>{id}
            </Link>}</h2>
      <button
        onClick={onLogout}
        className="bg-blue-700 text-white rounded p-2 mt-5 hover:bg-sky-700"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-700 text-white rounded p-2 mt-5 hover:bg-sky-700"
      >
        Get Details
      </button>
    </div>
  );
}
