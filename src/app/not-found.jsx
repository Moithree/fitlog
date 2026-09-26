import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] mb-6">
        <Dumbbell className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white">404</h1>
      <h2 className="text-xl font-bold uppercase text-neutral-300 mt-2">PAGE NOT FOUND</h2>
      <p className="text-neutral-400 text-sm mt-2 max-w-sm">
        Looks like you took a wrong rep. The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-md hover:bg-[#b8e600] transition"
      >
        Back to Safety
      </Link>
    </div>
  );
}