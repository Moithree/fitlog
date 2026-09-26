'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  // Lazy initial state: localStorage থেকে ডাটা প্রাথমিকভাবেই লোড হবে
  const [todayPlan, setTodayPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPlan = localStorage.getItem('todayPlan');
      return savedPlan ? JSON.parse(savedPlan) : [];
    }
    return [];
  });

  const [savedWorkouts, setSavedWorkouts] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedList = localStorage.getItem('savedWorkouts');
      return savedList ? JSON.parse(savedList) : [];
    }
    return [];
  });

  // ডাটা পরিবর্তন হলে LocalStorage-এ আপডেট হবে
  useEffect(() => {
    localStorage.setItem('todayPlan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  // Add to today's plan (Cap of 5 lifts check)
  const addToTodayPlan = (workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! Maximum 5 lifts allowed for today's plan.");
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already added to Today's Plan!");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  // Add to saved for later
  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error('Already saved for later!');
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success('Saved for later');
  };

  // Remove from today's plan
  const removeFromTodayPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  // Remove from saved list
  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from saved list');
  };

  // Mark workout as done
  const toggleDone = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = !item.isDone;
          toast.success(updated ? 'Workout marked as done!' : 'Workout status reset');
          return { ...item, isDone: updated };
        }
        return item;
      })
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);

