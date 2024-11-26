import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (

    <>
   <Navbar/>

   <Sidebar/>

   <div className="p-4 sm:ml-64">
      {children}
    </div>
   </>
  );
}