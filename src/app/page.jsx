'use client';

import { useState } from "react";
import QRCode from "qrcode"; 
import Scanner from "./components/Scanner";

export default function Home() {
  const data = { 
    id: "1",
    name: "zain", 
    surename: "kara", 
  };

  const [user, setUser] = useState({ name: "", surname: "" }); 
  const [formData, setFormData] = useState({ name: "", surname: "" }); 
  const [src, setSrc] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    setUser(formData); // Set the user object
    console.log("User Object:", formData);
  };

  const generateQRCode = () => {
    const text = JSON.stringify(user); // Create a stringified version of the user object
    QRCode.toDataURL(text)
      .then((url) => setSrc(url))
      .catch((err) => console.error("Error generating QR Code:", err));
  };

  return (
    <div className="justify-center items-center justify-items-center">
      <h1 className="capitalize font-bold text-xl">this is a scanner</h1>
      
      {src && <img src={src} alt="QR Code" />}
      
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="text-black"
          type="text"
          placeholder="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <button type="button" onClick={generateQRCode}>
        Generate QR Code
      </button>

      <p>{data.name + " " + data.surename}</p>
      <Scanner />
    </div>
  );
}
