'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

const emptySubscribe = () => () => {};

export default function Navbar() {
  const { todayPlan } = usePlan();

  // Client side detection without useEffect state cascading issue
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-white">
          FITLOG
        </Link>

        <nav>
          <div className="flex items-center gap-4">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 bg-[#ccff00] text-black font-bold px-3 py-1.5 rounded-lg text-xs uppercase"
            >
              <span>Plan</span>
              <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                {isMounted ? todayPlan.length : 0}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
