import Link from "next/link";
import EventIcon from "./icons/EventIcon";
import SignOutIcon from "./icons/SignoutIcon";
import ScanIcon from "./icons/ScanIcon";
import { SignOutButton } from "@clerk/nextjs";
import { PlusIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ toggle, setToggle }) => {
  return (
    <>
      {/* Show overlay only on mobile */}
      {toggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" // Hide on larger screens
          onClick={() => setToggle(false)} // Close sidebar on backdrop click
        />
      )}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 mt-10 ">
          <ul className="space-y-2 font-medium">
            {/* Events */}
           <li>
              <Link
                href="/Home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <EventIcon />
                <span className="ms-3">Events</span>
              </Link>
            </li>
            {/* adding events */}
            <li>
              <Link
                href="/Home/events"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PlusIcon  className="w-5 h-5" />
                <span className="ms-3">Add Events</span>
              </Link>
            </li>
            {/* scanning page */}
            <li>
              <Link
                href="/Home/scan"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ScanIcon className="w-5 h-5" />
                <span className="ms-3">Scan QR</span>
              </Link>
            </li>
            <li>
              <SignOutButton>
                <p className="flex items-center p-2 hover:cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <SignOutIcon />
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                </p>
              </SignOutButton>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
