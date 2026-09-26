'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DummyIcon } from 'lucide-react'; // বা অন্য কোনো পছন্দসই আইকন
import { Dumbbell } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 text-white px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider hover:opacity-90 transition">
          <Dumbbell className="w-6 h-6 text-[#ccff00]" />
          <span>FIT<span className="text-[#ccff00]">LOG</span></span>
        </Link>

        {/* Middle: Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
          <Link
            href="/"
            className={`transition hover:text-[#ccff00] ${
              pathname === '/' ? 'text-[#ccff00] underline underline-offset-8 decoration-2' : 'text-neutral-400'
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`transition hover:text-[#ccff00] ${
              pathname === '/my-plan' ? 'text-[#ccff00] underline underline-offset-8 decoration-2' : 'text-neutral-400'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black font-bold text-xs px-3 py-1.5 rounded-full hover:bg-[#b8e600] transition"
          >
            <span>Plan</span>
            <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-neutral-600 text-white font-bold text-xs px-3 py-1.5 rounded-full hover:border-[#ccff00] hover:text-[#ccff00] transition"
          >
            <span>Saved</span>
            <span className="bg-neutral-800 text-[#ccff00] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}