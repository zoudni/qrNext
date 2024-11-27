import React from "react";
import Link from "next/link";
const Button = ({ href, buttonText, className }) => {
  return (
    <Link href={href}>
      <button
        className={`${className} p-3 w-52  text-xl md:text-2xl rounded-lg   `}
      >
        {buttonText}
      </button>
    </Link>
  );
};

export default Button;
