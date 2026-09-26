import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-400 py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-black text-lg tracking-wider">
          <Dumbbell className="w-5 h-5 text-[#ccff00]" />
          <span>FIT<span className="text-[#ccff00]">LOG</span></span>
        </Link>

        {/* Right: Copyright Line */}
        <p className="text-xs text-neutral-500 text-center md:text-right font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}