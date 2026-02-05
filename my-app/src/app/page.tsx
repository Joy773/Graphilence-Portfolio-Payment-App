"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/Components/Navbar";
import LandingPage from "@/Components/LandingPage";
import Footer from "@/Components/Footer";
import RevealOnScroll from "@/Components/RevealOnScroll";

const SectionSkeleton = () => (
  <div className="min-h-[180px] w-full animate-pulse rounded-xl bg-gray-100/60" />
);

const Campany = dynamic(() => import("@/Components/campany").then((m) => m.default), {
  ssr: false,
  loading: SectionSkeleton,
});

const WorkList = dynamic(() => import("@/Components/WorkList").then((m) => m.default), {
  ssr: false,
  loading: SectionSkeleton,
});

const Founders = dynamic(() => import("@/Components/Founders").then((m) => m.default), {
  ssr: false,
  loading: SectionSkeleton,
});

const FAQ = dynamic(() => import("@/Components/FAQ").then((m) => m.default), {
  ssr: false,
  loading: SectionSkeleton,
});

const SendQuery = dynamic(() => import("@/Components/SendQuery").then((m) => m.default), {
  ssr: false,
  loading: SectionSkeleton,
});

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
