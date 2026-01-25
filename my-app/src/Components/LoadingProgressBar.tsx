"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingProgressBarProps {
    isLoading?: boolean;
    className?: string;
}

const LoadingProgressBar = ({ isLoading = true, className = "" }: LoadingProgressBarProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isLoading) {
            setProgress(0);
            return;
        }

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev; // Stop at 90% until loading completes
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 90);
            });
        }, 200);

        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (isLoading && progress < 90) {
            // Gradually increase progress
            const timer = setTimeout(() => {
                setProgress((prev) => Math.min(prev + 10, 90));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]);

    // Complete the progress when loading finishes
    useEffect(() => {
        if (!isLoading && progress > 0) {
            setProgress(100);
            const timer = setTimeout(() => setProgress(0), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]);

    if (!isLoading && progress === 0) return null;

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
            <div className="h-1 bg-gray-200 dark:bg-gray-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                />
            </div>
            {/* Shimmer effect */}
            <motion.div
                className="absolute top-0 h-1 w-32 bg-white opacity-50"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

export default LoadingProgressBar;
