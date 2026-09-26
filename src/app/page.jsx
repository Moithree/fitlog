'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star, Plus, Check, ArrowUpDown, Loader2 } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';


export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const { todayPlan, addToTodayPlan } = usePlan();

  const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return (a.duration || 0) - (b.duration || 0);
    if (sortBy === 'calories') return (b.caloriesBurned || b.calories || 0) - (a.caloriesBurned || a.calories || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
        <p className="text-sm font-bold tracking-wider uppercase text-neutral-400">Loading Workouts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-10 bg-black min-h-screen text-white">
      {/* Hero Banner */}
      <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="space-y-5 max-w-xl z-10">
          <p className="text-[#ccff00] font-black text-[11px] uppercase tracking-widest">WORKOUT LIBRARY</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-[1.05]">
            TRAIN WITH INTENT.<br />LOG EVERY SET.
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion. Pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-block bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-md hover:bg-[#b8e600] transition"
          >
            Browse Workouts
          </a>
        </div>

        {/* Hero Right Image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 z-10">
          <Image
            src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
            alt="Workout Model"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Library Header & Sorting */}
      <div id="library" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4 pt-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">THE LIBRARY</h2>
          <p className="text-neutral-400 text-xs mt-1">Twelve lifts covering every major muscle group.</p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-[#141414] border border-neutral-800 px-3 py-1.5 rounded-lg">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs font-bold text-neutral-400 uppercase">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white text-xs font-bold uppercase focus:outline-none cursor-pointer"
          >
            <option value="default" className="bg-neutral-900">Default</option>
            <option value="duration" className="bg-neutral-900">Duration (Shortest)</option>
            <option value="calories" className="bg-neutral-900">Calories (Highest)</option>
            <option value="rating" className="bg-neutral-900">Rating (Highest)</option>
          </select>
        </div>
      </div>

      {/* Grid of Workouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((workout) => {
          const isInPlan = todayPlan.some((item) => item.id === workout.id);
          const workoutTitle = workout.name || workout.title;
          const categories = workout.muscleGroups || workout.category || [];
          const calories = workout.caloriesBurned || workout.calories;

          return (
            <div
              key={workout.id}
              className="bg-[#141414] border border-neutral-800/90 rounded-2xl overflow-hidden hover:border-neutral-700 transition flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <Link href={`/workout/${workout.id}`} className="block relative h-52 w-full bg-neutral-950 overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workoutTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Neon Green Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {categories.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-[#ccff00] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Info Container */}
                <div className="p-5 space-y-2">
                  <Link href={`/workout/${workout.id}`}>
                    <h3 className="font-black text-base uppercase text-white tracking-wide hover:text-[#ccff00] transition">
                      {workoutTitle}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-400 font-medium line-clamp-1">{workout.equipment}</p>

                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-300 pt-3 border-t border-neutral-800/80">
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Clock className="w-3.5 h-3.5" /> {workout.duration}m
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Flame className="w-3.5 h-3.5 text-[#ccff00]" /> {calories}cal
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {workout.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => addToTodayPlan(workout)}
                  disabled={isInPlan}
                  className={`w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider py-3 rounded-lg transition ${
                    isInPlan
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                      : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
                  }`}
                >
                  {isInPlan ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isInPlan ? 'In Today Plan' : 'Add to Plan'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}