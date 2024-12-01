import Image from "next/image";
import heroImage from "../../public/QR.svg";
import Button from "./components/Button";
export default function Home() {
  return (
    <section
      className="flex flex-col md:flex-row p-10 items-center justify-center   lg:px-[15vw]  h-screen lg:min-h-full"
      id="home"
    >
      <div className="w-full text-balance flex flex-col items-center justify-center mt-10 sm:mt-20 md:mt-5 lg:mt-0 md:items-start">
        <h1 className=" text-2xl md:text-4xl lg:text-6xl leading-normal lg:leading-relaxed font-rb font-bold text-oliveGreen text-center md:text-left ">
          Manage Your Business with QR Codes
        </h1>

        {/* mobile image */}
        <Image
          src={heroImage}
          alt="coding infront of a pc holding a cup of coffee "
          width={350}
          height={350}
          className="flex md:hidden"
        />

        <p className="text-sm md:text-lg lg:text-xl text-pretty  text-center md:text-start leading-relaxed mt-7 md:mt-14 font-rb font-light ">
          Generate QR codes for events, coupons and much more
        </p>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 ">
          <Button
            href="/sign-up"
            buttonText="Get Started"
            className="mt-7 md:mt-10 bg-blue-600 text-slate-100"
          />
          <Button
            href="/sign-in"
            buttonText="Login"
            className="mt-7 md:mt-10 border-2 border-blue-600 bg-slate-100 text-blue-600 "
          />
        </div>
      </div>
      {/* Desktop image */}
      <Image
        src={heroImage}
        alt="coding infront of a pc holding a cup of coffee "
        width={600}
        height={600}
        className="hidden md:flex"
      />
    </section>
  );
}
