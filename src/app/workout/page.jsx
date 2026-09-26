'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, Star, Plus, Bookmark, Check } from 'lucide-react';
import workoutsData from '@/data/workouts.json';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetailPage({ params }) {
  // Next.js 15+ এ params একটি Promise
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const { todayPlan, savedWorkouts, addToTodayPlan, addToSaved } = usePlan();

  // useEffect বা useState ছাড়াই সরাসরি ডাটা বের করা
  const workout = workoutsData.find((item) => item.id === workoutId);

  if (!workout) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-black text-white uppercase">Workout Not Found</h2>
        <p className="text-neutral-400 text-sm mt-2">The exercise you are looking for does not exist.</p>
        <Link
          href="/"
          className="mt-6 bg-[#ccff00] text-black font-extrabold px-5 py-2.5 rounded-md hover:bg-[#b8e600] transition text-sm"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  const isInPlan = todayPlan.some((item) => item.id === workout.id);
  const isSaved = savedWorkouts.some((item) => item.id === workout.id);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#ccff00] uppercase tracking-wider mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Link>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Side — Visual / Media */}
        <div className="relative h-80 md:h-[500px] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
          <Image
            src={workout.image}
            alt={workout.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side — Details */}
        <div className="space-y-6">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.category.map((cat, i) => (
              <span
                key={i}
                className="bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-extrabold uppercase px-3 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
              {workout.title}
            </h1>
            <p className="text-neutral-400 text-sm md:text-base mt-3 leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Panel */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-neutral-500 font-bold uppercase">EQUIPMENT</p>
              <p className="text-white font-semibold mt-1">{workout.equipment}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-bold uppercase">DIFFICULTY</p>
              <p className="text-white font-semibold mt-1">{workout.difficulty}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-bold uppercase">SETS / REPS</p>
              <p className="text-[#ccff00] font-bold mt-1">{workout.sets} sets × {workout.reps}</p>
            </div>
            <div>
              <p className="text-neutral-500 font-bold uppercase">DURATION</p>
              <p className="text-white font-semibold mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" /> {workout.duration} min
              </p>
            </div>
            <div>
              <p className="text-neutral-500 font-bold uppercase">CALORIES</p>
              <p className="text-white font-semibold mt-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.calories} kcal
              </p>
            </div>
            <div>
              <p className="text-neutral-500 font-bold uppercase">RATING</p>
              <p className="text-amber-400 font-bold mt-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {workout.rating}
              </p>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-neutral-800 pb-2">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2.5">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-xs md:text-sm text-neutral-300">
                  <span className="bg-neutral-800 text-[#ccff00] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToTodayPlan(workout)}
              className={`flex-1 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wider py-3.5 px-6 rounded-lg transition ${
                isInPlan
                  ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-not-allowed'
                  : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
              }`}
            >
              {isInPlan ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isInPlan ? "Added to Plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className={`flex-1 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wider py-3.5 px-6 rounded-lg border transition ${
                isSaved
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-400'
                  : 'border-neutral-700 hover:border-[#ccff00] text-white hover:text-[#ccff00]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}