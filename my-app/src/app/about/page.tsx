import React from "react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";

const page = () => {
  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      <h1 className="mt-20 text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch">
        Fueling Minds Inspiring Designs..
      </h1>
      <div className="w-full mt-10">
        <Image
          src="/about-us/Everyone.avif"
          alt="Everyone"
          width={1200}
          height={800}
          className="w-full h-auto"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>
      <div className="bg-black lg:grid lg:grid-cols-2 sm:grid-cols-1 pt-20 -mx-10 lg:-mx-20 px-10 lg:px-20 lg:items-center">
        <div className="lg:w-[800px] text-center lg:text-left">
          <h1 className="text-white lg:text-6xl text-4xl font-bold">
            Musemind Excellence Through Innovation.
          </h1>
        </div>
        <div className="mt-8 lg:mt-0 text-center lg:text-left">
          <p className="text-zinc-300">
            At Musemind, our journey is fired by passion—our core spark. The
            secret to our innovation and success? Its the fusion of relentless
            dedication, a heart that beats for design, and a drive to innovate!
            With years of experience in the field, we have honed our skills to
            become At our agency
          </p>
          <button className="bg-purplish-blue text-white px-4 py-2 rounded-md cursor-pointer mt-10 mx-auto lg:mx-0 inline-block">
            Discover Our Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
