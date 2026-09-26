'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Check, Trash2, Eye, Dumbbell, AlertCircle } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'saved'
  const { todayPlan, savedWorkouts, removeFromTodayPlan, removeFromSaved, toggleDone } = usePlan();

  // Metrics Summary calculation for Today's Plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, item) => acc + (item.duration || 0), 0);
  const totalCalories = todayPlan.reduce((acc, item) => acc + (item.calories || 0), 0);

  const currentList = activeTab === 'today' ? todayPlan : savedWorkouts;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-sm mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">EXERCISES</p>
            <p className="text-3xl font-black text-white mt-1">{totalExercises} <span className="text-xs font-normal text-neutral-500">/ 5</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
            <Dumbbell className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">MINUTES</p>
            <p className="text-3xl font-black text-white mt-1">{totalMinutes} <span className="text-xs font-normal text-neutral-500">min</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">CALORIES</p>
            <p className="text-3xl font-black text-white mt-1">{totalCalories} <span className="text-xs font-normal text-neutral-500">kcal</span></p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 mb-8">
        <button
          onClick={() => setActiveTab('today')}
          className={`pb-3 px-6 text-sm font-extrabold uppercase tracking-wider transition border-b-2 ${
            activeTab === 'today'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Today&apos;s Plan ({todayPlan.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-6 text-sm font-extrabold uppercase tracking-wider transition border-b-2 ${
            activeTab === 'saved'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Saved ({savedWorkouts.length})
        </button>
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center my-8">
          <AlertCircle className="w-12 h-12 text-neutral-600 mb-4" />
          <h3 className="text-xl font-black text-white uppercase tracking-wide">NOTHING HERE YET</h3>
          <p className="text-neutral-400 text-sm mt-2 max-w-md">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#b8e600] transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-neutral-900 border rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                item.isDone ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-neutral-800'
              }`}
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-950 border border-neutral-800">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className={`font-black text-base uppercase tracking-wide ${item.isDone ? 'line-through text-neutral-400' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    <span className="text-neutral-500">Equipment:</span> {item.equipment}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-neutral-300 font-semibold mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {item.duration}m</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#ccff00]" /> {item.calories}cal</span>
                    <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-neutral-800">
                <Link
                  href={`/workout/${item.id}`}
                  className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>

                {activeTab === 'today' && (
                  <button
                    onClick={() => toggleDone(item.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition ${
                      item.isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-neutral-800 hover:bg-[#ccff00] hover:text-black text-white'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{item.isDone ? 'Done' : 'Mark as Done'}</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === 'today' ? removeFromTodayPlan(item.id) : removeFromSaved(item.id)
                  }
                  className="bg-neutral-800 hover:bg-rose-500/20 hover:text-rose-400 text-neutral-400 p-2 rounded-lg transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}