"use client";

import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>This is the Profile Page</h1>
      <h1>Welcome User.</h1>
      <button
        onClick={onLogout}
        className="bg-blue-700 text-white rounded p-2 mt-5 hover:bg-sky-700"
      >
        Logout
      </button>
    </div>
  );
}
