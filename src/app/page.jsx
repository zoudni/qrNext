'use client';

import Scanner from "./components/Scanner";
import Generator from "./components/Generator";

export default function Home() {


  const data = { 
    id: "1",
    name: "zain", 
    surname: "kara", 
  };

  return (
    <div className=" flex flex-col h-screen justify-center items-center justify-items-center space-y-5">
      <h1 className="capitalize font-bold text-2xl">QR code Scanner/Generator</h1>
      <Generator/> 
      <Scanner />
    </div>
  );
}
