'use client'

import {useState} from 'react'
import QRCode from "qrcode"
import placeholder from '../../../public/code.png'
const useGenerator = () => {


    const [user, setUser] = useState([]); 
    const [formData, setFormData] = useState({ name: "", surname: "" }); 
    const [src, setSrc] = useState(placeholder);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => { 
      e.preventDefault();

      const newUser = {id: (Date.now().toString()) , ...formData}

      setUser((prevUsers) => [...prevUsers, newUser]); // Set the user object

      setFormData({name:"", surname:""}); 

      console.log("Updated User List:", [...user, newUser]);

    };
  
    const generateQRCode = () => {
      const text = JSON.stringify(user[user.length-1]); // Create a stringified version of the user object
      QRCode.toDataURL(text)
        .then((url) => setSrc(url))
        .catch((err) => console.error("Error generating QR Code:", err));
    };

  return {
    src, user, formData,
    render: (
    <div>

    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          className="text-black p-2 rounded-lg "
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className=" text-black p-2 rounded-lg"
          type="text"
          placeholder="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-500 rounded-lg py-3 font-bold text-slate-100">Submit</button>
      </form>

      <button type="button"  className="bg-blue-500 rounded-lg py-3 font-bold text-slate-100 mt-3 w" onClick={generateQRCode}>
        Generate QR Code
      </button>

      </div>

  

    </div>
  )}
}

export default useGenerator