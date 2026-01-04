import React from "react";
import Navbar from "@/Components/Navbar";
import LandingPage from "@/Components/LandingPage";
import Campany from "@/Components/campany";
import WorkList from "@/Components/WorkList";
import Founders from "@/Components/Founders";
import FAQ from "@/Components/FAQ";
import Footer from "@/Components/Footer";
import SendQuery from "@/Components/SendQuery";

export default function Home() {
  return (
    <div className="px-10 lg:px-20">
      <Navbar />
      <LandingPage />
      <Campany /> 
      <WorkList />
      <Founders />
      <FAQ />
      <SendQuery />
      <Footer />
    </div>
  );
}
