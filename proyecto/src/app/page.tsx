"use client";
import Navigation from "./components/Navigation";
import Login from "./Page/login";



export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-3 bg-gradient-to-r from-gray-900 via-indigo-300 to-red-900 text-white ">
      <Navigation />
      <div>
        <Login>
        </Login>
      </div>
    </div>
  );
}
