"use client";



// authentication dependencies
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const {isLoaded, isSignedIn } = useUser(); 
  const router = useRouter(); 


  useEffect(() => { 
    if(isLoaded && !isSignedIn){ 
      router.push(`/sign-in?redirect=/Home`)
    }
  },[isLoaded, isSignedIn, router]);

  return (
<>

   this is home page


</>
  );
}
