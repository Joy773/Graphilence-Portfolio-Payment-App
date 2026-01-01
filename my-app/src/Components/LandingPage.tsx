"use client";

export default function LandingPage() {
  return (
    <div className="mt-20">
      <div className="grid grid-cols-2 justify-between items-center">
        <div className="bg-red-500 w-[700px]">
          <p className="text-xs text-midnight-monarch mb-4">
            Available for New Projects
          </p>
          <h1 className="text-6xl font-bold text-midnight-monarch">
            Global UX design agency digital partner for AI/ML solutions
          </h1>
        </div>
        <div className="bg-amber-400 w-1/2 flex just">
            <p className="text-midnight-monarch">Wavespace is a global UX agency that helps brands scale with fast, high performance digital experiences.</p>
        </div>
      </div>
    </div>
  );
}
