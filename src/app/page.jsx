'use client'

import { useState } from "react";
import QRCode from "qrcode"; 
import Scanner from "./components/Scanner";

export default function Home() {

  const [name, setName] = useState(); 
  const [src , setSrc ] = useState(); 

  const generate = () => { 
    QRCode.toDataURL(`https://github.com/${name}`).then(setSrc); 
  }

  return (
    <div className="justify-center items-center justify-items-center ">

        <h1 className="capitalize font-bold text-xl">this is a scanner</h1>
        <img src={src} alt="" />
        <input className="text-black" type="text"  onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={generate}> generete </button>
  
        <Scanner/>
    </div>
  );
}
