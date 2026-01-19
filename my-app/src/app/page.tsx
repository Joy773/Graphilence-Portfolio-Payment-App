"use client";

import React from "react";
import Navbar from "@/Components/Navbar";
import LandingPage from "@/Components/LandingPage";
import Campany from "@/Components/campany";
import WorkList from "@/Components/WorkList";
import Founders from "@/Components/Founders";
import FAQ from "@/Components/FAQ";
import Footer from "@/Components/Footer";
import SendQuery from "@/Components/SendQuery";
import RevealOnScroll from "@/Components/RevealOnScroll";

export default function Home() {
  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      <RevealOnScroll>
        <LandingPage />
      </RevealOnScroll>
      <RevealOnScroll delay={0.2}>
        <Campany /> 
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <WorkList />
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <Founders />
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <FAQ />
      </RevealOnScroll>
      <RevealOnScroll delay={0.1}>
        <SendQuery />
      </RevealOnScroll>
      <Footer />
    </div>
  );
}
