import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl w-full mb-6"></div>
      
      {/* Title Skeleton */}
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mb-4"></div>
      
      {/* List Skeletons */}
      <div className="space-y-3">
        <div className="flex gap-4">
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mt-3"></div>
        </div>
        <div className="flex gap-4">
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mt-3"></div>
        </div>
        <div className="flex gap-4">
            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6 mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;