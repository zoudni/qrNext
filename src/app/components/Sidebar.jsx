import Link from "next/link";
import EventIcon from "./icons/EventIcon";
import SignOutIcon from "./icons/SignoutIcon";
import { SignOutButton } from "@clerk/nextjs";

const Sidebar = ({ toggle }) => {


  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        toggle ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/home/generate"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <EventIcon />
              <span className="ms-3">Events</span>
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
  );
};

export default Sidebar;
