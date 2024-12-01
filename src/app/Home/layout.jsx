'use client'
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {

  const [toggle , setToggle ] = useState(false); 

  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        // Automatically open the sidebar on larger screens
        setToggle(true);
      } else {
        // Keep the sidebar closed on smaller screens
        setToggle(false);
      }
    };

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar toggle={toggle} setToggle={setToggle} />

      <Sidebar toggle={toggle} />

      <div className="justify-center items-center  p-4 mt-24 sm:ml-64  ">
        {children}
        </div>


    </>
  );
}
