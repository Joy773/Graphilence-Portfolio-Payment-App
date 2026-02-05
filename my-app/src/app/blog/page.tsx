import { Suspense } from "react";
import BlogPageContent from "./BlogPageContent";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

function BlogPageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870] px-10 lg:px-20">
      <Navbar variant="gradient" />
      <div className="mt-20 mb-20 flex justify-center items-center py-24">
        <div className="loader" aria-label="Loading" />
      </div>
      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageFallback />}>
      <BlogPageContent />
    </Suspense>
  );
}
