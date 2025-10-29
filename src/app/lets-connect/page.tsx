"use client";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function LetsConnect() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

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

            <main className="flex-1 flex items-center justify-center px-6 md:px-12 py-16 md:py-24">
                <div className="w-full max-w-6xl">
                    {/* Contact Us Heading */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-12 md:mb-20">
                        CONTACT US
                    </h1>

                    {/* Content Grid - Mobile: Stack, Desktop: Side by Side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-8 md:space-y-12">
                            {/* Email */}
                            <div>
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Send an email</p>
                                <p className="text-base md:text-lg text-white">INFO@AFASHIONS.NET</p>
                            </div>

                            {/* Phone */}
                            <div>
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Phone</p>
                                <p className="text-base md:text-lg text-white">+91 9163327474</p>
                            </div>

                            {/* Location */}
                            <div>
                                <p className="text-xs md:text-sm text-gray-400 mb-2">Location</p>
                                <address className="text-base md:text-lg text-white not-italic leading-relaxed">
                                    62, MATHEWARTALA ROAD, TANGRA,
                                    <br />
                                    KOLKATA, WEST BENGAL 700046,
                                    <br />
                                    INDIA
                                </address>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <div>
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
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
