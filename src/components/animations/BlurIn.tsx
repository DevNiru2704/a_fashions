"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface BlurInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}

export default function BlurIn({
    children,
    className = "",
    delay = 0,
    duration = 0.8
}: BlurInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
