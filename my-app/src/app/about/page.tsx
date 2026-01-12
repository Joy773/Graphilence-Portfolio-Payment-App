"use client";
import React from "react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import { motion } from "motion/react";
import { GrServices } from "react-icons/gr";
import { GrUserExpert } from "react-icons/gr";
import { FaLaptopCode } from "react-icons/fa";
import { SiMicrostrategy } from "react-icons/si";
import { AiFillDatabase } from "react-icons/ai";
import { IoManSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
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
          <button className="bg-purplish-blue text-white px-4 py-2  mt-10 mx-auto lg:mx-0 inline-block rounded-full">
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

      <div className="bg-gray-50 -mx-10 lg:-mx-20 px-10 lg:px-20 py-16">
        <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-8 lg:gap-12">
          {/* Left: Team Image */}
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

          {/* Right: Text and Statistics */}
          <div className="lg:mt-0 mt-8 flex flex-col">
            {/* Introductory Text */}
            <p className="text-midnight-monarch text-base lg:text-lg mb-12 leading-relaxed">
              We Are Proud To Help Businesses Grow And Succeed In Different Industries. From Startups To Established Enterprises, Our Tailored Solutions Have Helped Them Conquer Challenges, Reach Milestones, And Actualize Their Visions.
            </p>

           

            {/* Statistics Section */}
            <div className="space-y-8">
              {/* First Stat */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 pb-8 border-b border-gray-300">
                <div className="flex-shrink-0">
                  <div className="text-6xl lg:text-7xl font-bold text-midnight-monarch mb-2">
                    250+
                  </div>
                  <div className="text-xl lg:text-2xl text-midnight-monarch">
                    Businesses Thrived
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base lg:text-lg text-midnight-monarch leading-relaxed">
                    We helped more than 250 business to reach to their business goals with our innovative solutions.
                  </p>
                </div>
              </div>

              {/* Second Stat */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 pt-8">
                <div className="flex-shrink-0">
                  <div className="text-6xl lg:text-7xl font-bold text-midnight-monarch mb-2">
                    24%
                  </div>
                  <div className="text-xl lg:text-2xl text-midnight-monarch">
                    Accumulated over $1B
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base lg:text-lg text-midnight-monarch leading-relaxed">
                    Over the time, working from Large to small business we have accumulated over $1B.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-20">
        <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-midnight-monarch text-center">Value that sets us apart</h1>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-10">
      <div className="bg-gray-50 p-10 rounded-lg">
        <IoManSharp className="text-purplish-blue text-4xl mb-5" />
        <h1 className="text-4xl font-bold text-midnight-monarch">Transparent Communication</h1>
        <p className="mt-5">We prioritize open dialogue, ensuring clients are informed at every turn. Our clear communication fosters trust and alignment, enriching collaboration.</p>
      </div>
      <div className="bg-gray-50 p-10 rounded-lg">
        <MdManageAccounts className="text-purplish-blue text-4xl mb-5" />
        <h1 className="text-4xl font-bold text-midnight-monarch">Precision Management</h1>
        <p className="mt-5">Our meticulous approach ensures every detail is accounted for, from strategy to execution. We optimize processes and deliver results that exceed expectations.</p>
      </div>
      <div className="bg-gray-50 p-10 rounded-lg">
        <FaLightbulb className="text-purplish-blue text-4xl mb-5" />
        <h1 className="text-4xl font-bold text-midnight-monarch">Meticulous Approach</h1>
        <p className="mt-5">We take a meticulous approach, ensuring every detail is accounted for. From strategy to execution, we optimize processes and deliver results that exceed expectations.</p>
      </div>
      <div className="bg-gray-50 p-10 rounded-lg">
        <FaStar className="text-purplish-blue text-4xl mb-5" />
        <h1 className="text-4xl font-bold text-midnight-monarch">Innovative Solutions</h1>
        <p className="mt-5">We are always looking for new and innovative solutions to help our clients achieve their goals. We are not afraid to think outside the box and come up with new ideas.</p>
      </div>
      </div>
      <div className="bg-black -mx-10 lg:-mx-20 px-10 lg:px-20 py-16 mt-25">
        <h1 className="text-white text-4xl sm:text-4xl lg:text-6xl font-bold text-center py-10">what makes us different from others</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-10">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <GrServices className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">User-centric Core</h1>
            <p className="text-zinc-300 text-base mt-5">Our approach starts with understanding your users. We uncover their needs, pain points, and behaviors to create meaningful solutions that resonate.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <GrUserExpert className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">Expert Team</h1>
            <p className="text-zinc-300 text-base mt-5">Our team is made up of experts in their fields. We have a team of experts who are experts in their fields.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <GrUserExpert className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">Transparent Process</h1>
            <p className="text-zinc-300 text-base mt-5">We keep you updated every step of the way. From the initial strategy to the final delivery, you'll always know what's happening and how we're progressing.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <FaLaptopCode className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">Responsive Agility</h1>
            <p className="text-zinc-300 text-base mt-5">We adapt quickly to changing needs and market dynamics. Our flexible approach ensures we're always ready to pivot and deliver the best results.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <SiMicrostrategy className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">Strategic Innovation</h1>
            <p className="text-zinc-300 text-base mt-5">We combine creativity with strategy to deliver impactful solutions. Our innovative ideas drive results and keep us ahead of the competition.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <AiFillDatabase className="text-purplish-blue text-4xl mb-5" />
            <h1 className="text-white text-4xl font-bold">Data-Driven Insights</h1>
            <p className="text-zinc-300 text-base mt-5">We use data to inform our decisions and drive results. We analyze market trends, user behavior, and performance metrics to make informed choices and optimize outcomes.</p>
          </div>
        </div>
      </div>

      {/* Achieved/Awards Section with Animated Background */}
      <div className="relative -mx-10 lg:-mx-20 px-10 lg:px-20 py-20 lg:py-32 overflow-hidden bg-gray-100">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* First animated blob */}
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4), rgba(236, 72, 153, 0.3), transparent)',
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, 80, 120, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Second animated blob */}
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] rounded-full blur-[140px] opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(14, 165, 233, 0.4), rgba(168, 85, 247, 0.3), transparent)',
            }}
            animate={{
              x: [0, -120, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Third animated blob */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40"
            style={{
              background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.3), rgba(251, 146, 60, 0.2), transparent)',
              top: '50%',
              left: '50%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: ['-50%', '-40%', '-50%'],
              y: ['-50%', '-40%', '-50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Large "Achieved" title - Desktop only */}
        <div className="relative z-10 mb-16 hidden lg:block">
          <h1 className="text-7xl lg:text-[12rem] font-bold text-white">
            Achieved
          </h1>
        </div>

        {/* Combined "Achieved Awards" title - Mobile/Tablet only */}
        <div className="relative z-10 mb-16 lg:hidden text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            Achieved Awards
          </h1>
        </div>

        {/* Awards Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Behance Card */}
          <div className="group bg-white hover:bg-black rounded-lg p-6 lg:p-8 shadow-lg transition-colors duration-300">
            <div className="text-4xl lg:text-5xl font-bold text-midnight-monarch group-hover:text-white mb-4 transition-colors duration-300">Bē</div>
            <h3 className="text-xl lg:text-2xl font-bold text-midnight-monarch group-hover:text-white mb-2 transition-colors duration-300">Behance</h3>
            <p className="text-gray-600 group-hover:text-gray-300 text-sm lg:text-base transition-colors duration-300">2x Interaction Design awards</p>
          </div>

          {/* Clutch Card */}
          <div className="group bg-white hover:bg-black rounded-lg p-6 lg:p-8 shadow-lg transition-colors duration-300 ">
            <div className="text-4xl lg:text-5xl font-bold text-midnight-monarch group-hover:text-white mb-4 transition-colors duration-300">
              <span className="inline-block w-16 h-16 rounded-full border-4 border-midnight-monarch group-hover:border-white flex items-center justify-center transition-colors duration-300">C</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-midnight-monarch group-hover:text-white mb-2 transition-colors duration-300">Clutch</h3>
            <p className="text-gray-600 group-hover:text-gray-300 text-sm lg:text-base transition-colors duration-300">Top B2B Service Provider and UX Design Agency</p>
          </div>

          {/* Dribbble Card */}
          <div className="group bg-white hover:bg-black rounded-lg p-6 lg:p-8 shadow-lg transition-colors duration-300 ">
            <div className="text-4xl lg:text-5xl font-bold text-midnight-monarch group-hover:text-white mb-4 transition-colors duration-300">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="none"/>
                <path d="M32 10 L42 32 L32 54 L22 32 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <circle cx="32" cy="32" r="8" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-midnight-monarch group-hover:text-white mb-2 transition-colors duration-300">Dribbble</h3>
            <p className="text-gray-600 group-hover:text-gray-300 text-sm lg:text-base transition-colors duration-300">One of the best Design Agency</p>
          </div>

          {/* Upwork Card */}
          <div className="group bg-white hover:bg-black rounded-lg p-6 lg:p-8 shadow-lg transition-colors duration-300 ">
            <div className="text-4xl lg:text-5xl font-bold text-midnight-monarch group-hover:text-white mb-4 transition-colors duration-300" style={{ fontFamily: 'sans-serif', letterSpacing: '-2px' }}>up</div>
            <h3 className="text-xl lg:text-2xl font-bold text-midnight-monarch group-hover:text-white mb-2 transition-colors duration-300">Upwork</h3>
            <p className="text-gray-600 group-hover:text-gray-300 text-sm lg:text-base transition-colors duration-300">Top Rated Design Agency</p>
          </div>
        </div>
 
        {/* Large "Awards" title at bottom - Desktop only */}
        <div className="relative z-10 mt-16 text-right hidden lg:block">
          <h1 className="text-7xl lg:text-[12rem] font-bold text-white">
            Awards
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
