"use client";

import React from "react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import { motion } from "motion/react";

const aboutUsImages = {
  offices: [
    "/about-us/office_1.avif",
    "/about-us/office_2.avif",
    "/about-us/office_3.avif",
    "/about-us/office_4.avif",
    "/about-us/office_5.avif",
    "/about-us/office_6.avif",
    "/about-us/office_7.avif",
    "/about-us/office_8.avif",
    "/about-us/office_9.avif",
    "/about-us/team.avif",
  ],
};

const Page = () => {
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
          <button className="bg-purplish-blue text-white px-4 py-2 cursor-pointer mt-10 mx-auto lg:mx-0 inline-block rounded-full">
            Discover Our Work
          </button>
        </div>
      </div>
      <div className="bg-black -mx-10 lg:-mx-20 py-16 overflow-hidden">
        <motion.div
          className="flex w-fit"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...aboutUsImages.offices, ...aboutUsImages.offices].map(
            (src, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[250px] overflow-hidden rounded-lg mx-2"
              >
                <Image
                  src={src}
                  alt={`Office ${(idx % aboutUsImages.offices.length) + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  sizes="300px"
                />
              </div>
            )
          )}
        </motion.div>
      </div>
      <div className="pt-20">
        <div className="lg:w-[1400px]">
          <p className="text-midnight-monarch lg:text-6xl text-3xl font-bold">
            We unite brand, culture and experience to drive impact inside and
            outside an organisation.
          </p>
        </div>
        <hr className="border-midnight-monarch my-15" />
      </div>
      <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-8">
        <div className="w-full lg:max-w-[637px] h-[300px] sm:h-[400px] lg:h-[560px] overflow-hidden">
          <Image
            src="/about-us/team.avif"
            alt="Team"
            width={637}
            height={560}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 637px"
            quality={95}
          />
        </div>
        <div className="lg:mt-0 mt-8">
          <p className="text-zinc-600 text-xl font-semibold">
            Over the years, we&apos;ve propelled numerous businesses to thrive,
            maintaining robust partnerships through our collaborative approach.
          </p>
          <p className="text-zinc-600 text-xl mt-5 font-semibold"> We are proud to help businesses grow and succeed in different
            industries. From startups to established enterprises, our tailored
            solutions have helped them conquer challenges, reach milestones, and
            actualize their visions.</p>
        </div>
        <div>
 
        </div>
      </div>
    </div>
  );
};

export default Page;
