'use client'

import { useState } from "react";
import QRCode from "qrcode"; 

export default function Home() {

  const [name, setName] = useState(); 
  const [src , setSrc ] = useState(); 

  const generate = () => { 
    QRCode.toDataURL(`https://github.com/${name}`).then(setSrc); 
  }

  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
        <img src={src} alt="" />
        <input className="text-black" type="text"  onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={generate}> generete </button>
    </div>
  );
}
