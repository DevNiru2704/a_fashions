"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function LetsConnect() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const footerRef = useRef(null);
    const isFooterInView = useInView(footerRef, { once: true, amount: 0.2 });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen w-full bg-black flex flex-col">
            <Navbar />
            <main className="flex items-center justify-center px-6 md:px-12 py-32 md:py-48 min-h-screen">
                <div className="w-full max-w-6xl">
                    {/* Contact Us Heading - Slide up animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-12 md:mb-20"
                    >
                        CONTACT US
                    </motion.h1>

                    {/* Content Grid - Mobile: Stack, Desktop: Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-8 md:space-y-12">
                            {/* Email - Slide up animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            >
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Send an email</p>
                                <p className="text-base md:text-lg text-white">INFO@AFASHIONS.NET</p>
                            </motion.div>

                            {/* Phone - Slide up animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Phone</p>
                                <p className="text-base md:text-lg text-white">+91 9163327474</p>
                            </motion.div>

                            {/* Location - Slide up animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            >
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Location</p>
                                <address className="text-base md:text-lg text-white not-italic leading-relaxed">
                                    62, MATHEWARTALA ROAD, TANGRA,
                                    <br />
                                    KOLKATA, WEST BENGAL 700046,
                                    <br />
                                    INDIA
                                </address>
                            </motion.div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="name" className="block text-xs md:text-sm text-gray-400 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        className="w-full bg-zinc-900 text-white px-4 py-3 rounded focus:outline-none placeholder-gray-600"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-xs md:text-sm text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        className="w-full bg-zinc-900 text-white px-4 py-3 rounded focus:outline-none placeholder-gray-600"
                                        required
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label htmlFor="message" className="block text-xs md:text-sm text-gray-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Send a message"
                                        rows={6}
                                        className="w-full bg-zinc-900 text-white px-4 py-3 rounded focus:outline-none placeholder-gray-600 resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button - Centered */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-white text-black px-8 py-3 rounded font-medium hover:bg-gray-200 transition-colors duration-300"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Footer with fade-in animation when in viewport */}
            <motion.div
                ref={footerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: isFooterInView ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Footer />
            </motion.div>
        </div>
    );
}
