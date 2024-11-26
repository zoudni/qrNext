"use client";

import Scanner from "../../components/Scanner";
import useGenerator from "../../components/Generator";
import Image from "next/image";

// authentication dependencies
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const { render, src } = useGenerator();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/Home`);
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className=" flex flex-col h-screen justify-center items-center justify-items-center space-y-5">
      <div className="flex flex-col md:flex-row  justify-center items-center space-y-5 md:space-x-5 ">
        <div>
          <h1 className="capitalize font-bold text-2xl">
            QR code Scanner/Generator
          </h1>
          {render}
        </div>

        <div className="w-[250px] h-[250px] bg-blue-500 p-10 rounded-xl">
          {src && <Image src={src} alt="QR Code" width={250} height={250} />}
        </div>
      </div>

      <Scanner />
    </div>
  );
}
