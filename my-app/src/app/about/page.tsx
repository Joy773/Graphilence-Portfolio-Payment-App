"use client";
import React from "react";
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import { motion } from "motion/react";  

import { IoManSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Footer from "@/Components/Footer";
import RevealOnScroll from "@/Components/RevealOnScroll";
import SendQuery from "@/Components/SendQuery";
import { aboutUs, teamMembers } from "@/contexts/assets";

const Page = () => {
  return (
    <div className="w-full min-w-0">
      <div className="max-w-[1400px] mx-auto px-10 lg:px-20">
      <Navbar />
      <RevealOnScroll>
        <h1 className="mt-20 text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight-monarch text-center">
          Fueling Minds Inspiring Designs..
        </h1>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <div className="w-full mt-10">
        <Image
          src={aboutUs.everyone}
          alt="Everyone"
          width={1200}
          height={800}
          className="w-full h-auto"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <div className="bg-midnight-monarch lg:grid lg:grid-cols-2 sm:grid-cols-1 pt-20 -mx-10 lg:-mx-20 px-10 lg:px-20 lg:items-center">
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
          <button className="bg-purplish-blue hover:opacity-90 text-white px-4 py-2 cursor-pointer mt-10 mx-auto lg:mx-0 inline-block rounded-full">
            Discover Our Work
          </button>
        </div>
      </div>
      </RevealOnScroll>
      <RevealOnScroll delay={0.2}>
        <div className="bg-midnight-monarch -mx-10 lg:-mx-20 py-16 overflow-hidden">
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
          {[...aboutUs.offices, ...aboutUs.offices].map(
            (src, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[250px] overflow-hidden rounded-lg mx-2"
              >
                <Image
                  src={src}
                  alt={`Office ${(idx % aboutUs.offices.length) + 1}`}
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
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <div className="pt-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <p className="text-midnight-monarch lg:text-6xl text-3xl font-bold text-center">
            We unite brand, culture and experience to drive impact inside and
            outside an organisation.
          </p>
        </div>
        <hr className="border-midnight-monarch my-15" />
      </div>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <div className="bg-gray-50 -mx-10 lg:-mx-20 px-10 lg:px-20 py-16">
        <div className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-8 lg:gap-12">
          {/* Left: Team Image */}
          <div className="w-full lg:max-w-[637px] h-[300px] sm:h-[400px] lg:h-[560px] overflow-hidden">
            <Image
              src={aboutUs.team}
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
      </RevealOnScroll>

      {/* CEO / Founder Quote Section */}
      <RevealOnScroll delay={0.1}>
        <div className="bg-midnight-monarch -mx-10 lg:-mx-20 mt-20 px-10 lg:px-20 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[minmax(280px,400px)_1fr] gap-10 lg:gap-8 items-stretch">
            {/* Left: CEO Image + Name - narrower column so text has more space */}
            <div className="flex flex-col items-center lg:items-start justify-center">
              <div className="relative w-[182px] h-[190px] overflow-hidden rounded-lg">
                <Image
                  src="/CEO.jpeg"
                  alt="Founder & CEO"
                  fill
                  className="object-cover grayscale"
                  sizes="182px"
                  priority
                />
              </div>
              <h3 className="text-white text-[16px] font-bold mt-6">
                Zihan Ahmed Joy
              </h3>
              <p className="text-zinc-400 text-[12px] mt-1">
                2019, When I got my vision
              </p>
            </div>

            {/* Right: Quote / Narrative - quote at beginning of first line */}
            <div className="relative flex items-baseline gap-2 lg:gap-3 min-h-0">
              <span className="text-white text-[18px] lg:text-[28px] font-serif leading-none select-none shrink-0 align-baseline" aria-hidden>
                &ldquo;
              </span>
              <p className="text-white text-[18px] lg:text-[28px] leading-relaxed w-full min-w-0 pt-0">
                Back in 2014, I had just finished high school. No time to celebrate, I was already thinking, how do I help my family? Like most kids from a middle-class home, I aimed for engineering. Design? Never crossed my mind. But when my uncle nudged me toward graphic arts, I followed, not out of passion, but because it was something. Somewhere in that journey, I stumbled into UI/UX. No mentor, no roadmap. Just late nights, curiosity, and a deep urge to make things make sense. I kept wondering, how can design solve real problems?
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Three-column story + full-width quote section */}
      <RevealOnScroll delay={0.1}>
        <div className="bg-midnight-monarch -mx-10 lg:-mx-20 px-10 lg:px-20 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            {/* Top: Three columns - left text, middle text, right profile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
              {/* Left text block */}
              <div className="space-y-6">
                <p className="text-white text-base lg:text-lg leading-relaxed">
                  That question lit a fire in me. One project led to another & before long, I was designing for bigger companies, across borders, and I finally wanted to work abroad by going. By then, the dream had changed. It wasn&apos;t just about earning or designing for clients anymore.
                </p>
                <p className="text-white text-base lg:text-lg leading-relaxed">
                  I wanted to understand, Why do great founders fail, and why do strong products disappear? That one question led me across projects, borders, and eventually, toward something bigger.
                </p>
              </div>

              {/* Middle text block */}
              <div className="space-y-6">
                <p className="text-white text-base lg:text-lg leading-relaxed">
                  In 2019, I paused and dug deeper, not into tools, but into why products fail. And from that, Wavespace was born. I never planned to build an agency. I just wanted to solve problems. That mission hasn&apos;t changed. We don&apos;t show up to impress.
                </p>
                <p className="text-white text-base lg:text-lg leading-relaxed">
                  We show up to help founders who were once like me, full of vision, short on clarity. We design for outcomes. Because future Unicorns aren&apos;t found. they&apos;re designed. Now I&apos;m here, ready to team up with venture capital, building what&apos;s next, with clarity, speed, and heart
                </p>
              </div>

              {/* Right profile: name, tagline, image */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-white text-xl lg:text-2xl font-bold mb-1">
                  Zihan Ahmed Joy
                </h3>
                <p className="text-zinc-400 text-sm lg:text-base mb-6">
                  2026, we growing fast with unicorn energy
                </p>
                <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src="/CEO.jpeg"
                    alt="Zihan Ahmed Joy"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
              </div>
            </div>

            {/* Bottom: Centered quote directly below the three-column section */}
            <div className="mt-12 lg:mt-16 flex flex-col items-center text-center">
              <div className="w-full max-w-4xl border-t border-white/20" />
              <span
                className="mt-6 text-white text-4xl lg:text-5xl font-serif leading-none select-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="mt-4 text-white text-[18px] lg:text-[32px] leading-relaxed max-w-4xl">
                Wavespace started with design, now we&apos;re building future unicorns. With VC partners and early-stage founders, we combine clarity, code, and capital to launch what&apos;s next.
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Process behind our design section */}
      <RevealOnScroll delay={0.1}>
        <section className="-mx-10 lg:-mx-20 bg-gray-100 py-16 lg:py-40">
          <div className="max-w-[1400px] mx-auto px-10 lg:px-20">
            <h2 className="text-left text-[48px] font-bold text-black">
              The process behind our
            </h2>
            <p className="mt-0 text-left text-[48px] font-bold text-black">
              design of your product
            </p>

            <div className="mt-12 overflow-x-auto">
              <div className="flex gap-6 lg:gap-8 min-w-max">
                {/* Step 01 */}
                <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col w-[396px] h-[496px] flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-400">01</span>
                  <h3 className="mt-4 text-[26px] font-semibold text-midnight-monarch">
                    Discovery &amp; strategy
                  </h3>
                  <p className="mt-3 text-[18px] text-[#7e7e81] leading-relaxed font-semibold">
                    We align on business goals, audience needs, and product vision, setting a clear
                    foundation for what we&apos;re building and why.
                  </p>
                  <ul className="mt-auto pt-4 space-y-2 text-[18px] text-gray-700 list-disc list-inside font-semibold">
                    <li>Business goals &amp; product vision</li>
                    <li>Mission &amp; market positioning</li>
                    <li>Target users &amp; core audience</li>
                    <li>Unique value proposition</li>
                  </ul>
                </div>

                {/* Step 02 */}
                <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col w-[396px] h-[496px] flex-shrink-0">
                <span className="text-sm font-semibold text-gray-400">02</span>
                <h3 className="mt-4 text-[26px] font-semibold text-midnight-monarch">
                  Structure the Experience
                </h3>
                <p className="mt-3 text-[18px] text-[#7e7e81] leading-relaxed font-semibold">
                  We map out the user journey, define key screens, and shape the overall flow so
                  every step feels natural and intuitive.
                </p>
                <ul className="mt-auto pt-4 space-y-2 text-[18px] text-gray-700 list-disc list-inside font-semibold">
                  <li>User flows &amp; journey mapping</li>
                  <li>Low-fidelity wireframes</li>
                  <li>Information architecture</li>
                  <li>Core feature layout &amp; screen logic</li>
                </ul>
                </div>

                {/* Step 03 */}
                <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col w-[396px] h-[496px] flex-shrink-0">
                <span className="text-sm font-semibold text-gray-400">03</span>
                <h3 className="mt-4 text-[26px] font-semibold text-midnight-monarch">
                  Design the Interface
                </h3>
                <p className="mt-3 text-[18px] text-[#7e7e81] leading-relaxed font-semibold">
                  We bring the product to life with a visual language that&apos;s clean, consistent,
                  and aligned with your brand and users.
                </p>
                <ul className="mt-auto pt-4 space-y-2 text-[18px] text-gray-700 list-disc list-inside font-semibold">
                  <li>UI design &amp; layout</li>
                  <li>Visual style &amp; color system</li>
                  <li>Typography &amp; iconography</li>
                  <li>Interaction states &amp; micro-details</li>
                </ul>
                </div>

                {/* Step 04 */}
                <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col w-[396px] h-[496px] flex-shrink-0">
                <span className="text-sm font-semibold text-gray-400">04</span>
                <h3 className="mt-4 text-[26px] font-semibold text-midnight-monarch">
                  Build for Scale
                </h3>
                <p className="mt-3 text-[18px] text-gray-600 leading-relaxed">
                  We create scalable design systems and handoff-ready files, built for speed,
                  growth, and smooth collaboration with your dev team.
                </p>
                <ul className="mt-auto pt-4 space-y-2 text-[18px] text-gray-700 list-disc list-inside font-semibold">
                  <li>Design systems &amp; components</li>
                  <li>Dev-ready Figma files</li>
                  <li>Handoff documentation</li>
                  <li>Scalable structure for future updates</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="w-full mt-20">
          <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-midnight-monarch text-center">Value that sets us apart</h1>
        </div>
      </RevealOnScroll>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 gap-10">
        {[
          { icon: IoManSharp, title: "Transparent Communication", description: "We prioritize open dialogue, ensuring clients are informed at every turn. Our clear communication fosters trust and alignment, enriching collaboration." },
          { icon: MdManageAccounts, title: "Precision Management", description: "Our meticulous approach ensures every detail is accounted for, from strategy to execution. We optimize processes and deliver results that exceed expectations." },
          { icon: FaLightbulb, title: "Meticulous Approach", description: "We take a meticulous approach, ensuring every detail is accounted for. From strategy to execution, we optimize processes and deliver results that exceed expectations." },
          { icon: FaStar, title: "Innovative Solutions", description: "We are always looking for new and innovative solutions to help our clients achieve their goals. We are not afraid to think outside the box and come up with new ideas." },
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-gray-50 p-10 rounded-lg">
                <IconComponent className="text-purplish-blue text-4xl mb-5" />
                <h1 className="text-4xl font-bold text-midnight-monarch">{item.title}</h1>
                <p className="mt-5">{item.description}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      {/* Achieved/Awards Section with Animated Background */}
  
      <RevealOnScroll delay={0.1}>
        <div className="mt-20 mb-20">
          <h1 className="text-2xl font-bold text-midnight-monarch mb-8">Founder & Executive</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="flex flex-col">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-midnight-monarch mb-1">
                {member.name}
              </h3>
              <p className="text-sm lg:text-base text-gray-600">
                {member.designation}
              </p>
            </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </RevealOnScroll>
      {/* <div className="mt-20 bg-gray-50 -mx-10 lg:-mx-20 px-10 lg:px-20 py-16">
        <h1 className="text-4xl font-bold text-midnight-monarch text-center">Grow, create, and lead with Musemind</h1>
        <p className="text-gray-600 text-center mt-5 font-semibold">Choose Musemind to embrace your skills and passion. We are your growth partner, encouraging creativity and individual development while creating excellent user experiences in a fast-paced, collaborative atmosphere.</p>
        <div className="flex justify-center mt-5">
          <button className="bg-midnight-monarch hover:bg-purplish-blue text-white px-4 py-2 rounded-full">Join us</button>
        </div>
      </div> */}
      <SendQuery />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
