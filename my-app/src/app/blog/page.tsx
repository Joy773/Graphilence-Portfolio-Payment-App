import { Suspense } from "react";
import BlogPageContent from "./BlogPageContent";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

function BlogPageFallback() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-10 lg:px-20 min-h-screen bg-gradient-to-r from-[#2d2648] to-[#251870] box-border">
        <Navbar variant="gradient" />
        <div className="mt-20 mb-20 flex justify-center items-center py-24">
          <div className="loader" aria-label="Loading" />
        </div>
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
