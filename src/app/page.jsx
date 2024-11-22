'use client';

import Scanner from "./components/Scanner";
import useGenerator from "./components/Generator";
import Image from "next/image";

export default function Home() {


  const data = { 
    id: "1",
    name: "zain", 
    surname: "kara", 
  };

  const { render , src } = useGenerator();

  return (
    <div className=" flex flex-col h-screen justify-center items-center justify-items-center space-y-5">
      <div className="flex flex-col md:flex-row  justify-center items-center space-y-5 md:space-x-5 ">

            <div >
                <h1 className="capitalize font-bold text-2xl">QR code Scanner/Generator</h1>
                {render}
            </div>

            <div className="w-[250px] h-[250px] bg-blue-500 p-10 rounded-xl">

            {src && <Image src={src} alt="QR Code"  width={250} height={250}/>}


            </div>
          
      </div>


      <Scanner />
    </div>
  );
}
