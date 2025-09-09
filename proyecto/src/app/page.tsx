"use client";
import Navigation from "./components/Navigation";
import Login from "./Page/login";


export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-3 bg-gradient-to-r from-gray-900 via-indigo-300 to-red-900 text-white">
      <Navigation />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center sm:text-left from-gray-900 via-indigo-300 to-red-900 text-white p-8">
        <Login />
      </main>
    </div>
  );
}
