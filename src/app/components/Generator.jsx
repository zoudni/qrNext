"use client";

import { useState } from "react";
import placeholder from "../../../public/code.png";
import DownloadPdf from "./DownloadPdf";
import MultiUserPdf from "./MultiUserPdf";
import QRCode from "qrcode"

const useGenerator = () => {
  const [user, setUser] = useState([]); // All users
  const [formData, setFormData] = useState({ name: "", surname: "" }); // Form input
  const [src, setSrc] = useState(placeholder); // QR code image
  const [lastGeneratedUser, setLastGeneratedUser] = useState(null); // Last user for QR code

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { id: Date.now().toString(), ...formData };

    setUser((prevUsers) => [...prevUsers, newUser]); // Add user to the list
    setLastGeneratedUser(newUser); // Store the last generated user
    setFormData({ name: "", surname: "" });

    console.log("Updated User List:", [...user, newUser]);
  };

  const generateQRCode = () => {
    if (!lastGeneratedUser) {
      console.error("No user data available for QR code generation.");
      return;
    }

    const text = JSON.stringify(lastGeneratedUser); // Stringify the last user's data
    QRCode.toDataURL(text)
      .then((url) => setSrc(url))
      .catch((err) => console.error("Error generating QR Code:", err));
  };




  return {
    src,
    user,
    formData,
    lastGeneratedUser, 
    render: (
      <div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input
              className="text-black p-2 rounded-lg"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="text-black p-2 rounded-lg"
              type="text"
              placeholder="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 rounded-lg py-3 font-bold text-slate-100"
            >
              Submit
            </button>
          </form>

          <button
            type="button"
            className="bg-blue-500 rounded-lg py-3 font-bold text-slate-100 mt-3"
            onClick={generateQRCode}
          >
            Generate QR Code
          </button>

          {src && (
            <div className="flex mt-3 space-x-2">

            <DownloadPdf lastGeneratedUser={lastGeneratedUser} src={src}/>
            <MultiUserPdf user={user} src={src}/>
            </div>
          )}
        </div>
      </div>
    ),
  };
};

export default useGenerator;
