"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Play, Pause } from "lucide-react";

// Dynamically import PaymentModal to avoid SSR issues with react-paystack
const PaymentModal = dynamic(() => import("./PaymentModal"), { ssr: false });

const ExclusiveContent = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Target Date: 8th February 2026, 00:00:00
  // Note: Adjust timezone if necessary. Assuming local or specific UTC?
  // For now using local time of the user/browser or UTC.
  // Let's target UTC for consistency or just a fixed date string.
  const targetDate = new Date("2026-02-06T00:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Format with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  // return (
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  // Price in GHS
  const PRICE_GHS = 10.99; // Example price, verify with user

  const handlePaymentSuccess = () => {
    setHasPurchased(true);
    // Here you would typically trigger the download or show the hidden content
    alert("Payment Successful! Your download will start shortly.");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center min-h-screen bg-transparent text-foreground px-4 py-12 font-sans mt-8">
        <div className="w-full max-w-md">
          {/* Visual / Eye Image */}
          <div className="relative w-full max-w-md aspect-square mb-8 rounded-lg overflow-hidden">
            <Image
              src="/images/ARTWORK_SEE.jpeg"
              alt="See Brapurple"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Preview Button */}
          <button
            onClick={togglePlay}
            className="w-full bg-black hover:bg-zinc-800 text-white border border-zinc-700 py-3 px-6 text-lg tracking-widest font-bold uppercase flex items-center justify-center gap-3 transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? "Pause Preview" : "Preview Track"}
          </button>
        </div>

        {/* Date & Countdown */}
        <div className="">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase opacity-80">
              6th February 2026
            </h2>
            <div className="text-4xl md:text-6xl font-mono font-bold tracking-widest text-primary/80">
              {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
              {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </div>
          </div>

          {/* CTA Section */}
          <div className="w-full max-w-md space-y-6 text-center">
            <h3 className="text-lg md:text-xl font-medium tracking-wide mb-6">
              GET EARLY ACCESS HERE
            </h3>

            {hasPurchased ? (
              <div className="bg-green-900/20 border border-green-500/50 p-6 rounded-lg">
                <h4 className="text-green-500 font-bold text-xl mb-2">
                  THANK YOU FOR YOUR SUPPORT!
                </h4>
                <p className="text-zinc-300 mb-4">
                  You have successfully purchased the release.
                </p>
                <a
                  href="https://www.dropbox.com/scl/fi/8wylunlki288udnr3irxc/BRAPURPLE-SEE-EXPLICIT-Mas.mp3?rlkey=ee3jwsy19a14zjf2xy91a3e91&st=i1shxufw&dl=1"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded transition-colors uppercase tracking-widest"
                >
                  Download Now
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full px-8 md:px-0">
                <Link
                  href="https://brapurple.bandcamp.com/"
                  target="_blank"
                  className="block w-full"
                >
                  <button
                    className="w-full bg-[#183128] hover:bg-[#1f4034] text-[#cfdcd6] py-3 px-6 text-xl tracking-widest font-bold uppercase transition-colors"
                    style={{ fontFamily: "monospace" }}
                  >
                    Buy On Bandcamp
                  </button>
                </Link>

                <Link
                  href="https://even.biz/r/see-3926cc98-9df1-4305-b862-030225bc5709"
                  target="_blank"
                  className="block w-full"
                >
                  <button
                    className="w-full bg-[#183128] hover:bg-[#1f4034] text-[#cfdcd6] py-3 px-6 text-xl tracking-widest font-bold uppercase transition-colors"
                    style={{ fontFamily: "monospace" }}
                  >
                    Buy On Even
                  </button>
                </Link>

                {/* Mobile Money / Local Option */}
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-[#183128] hover:bg-[#1f4034] text-[#cfdcd6] py-3 px-6 text-lg tracking-widest font-bold uppercase transition-colors"
                  style={{ fontFamily: "monospace" }}
                >
                  Mobile Money <br />{" "}
                  <span className="text-sm">(Africa Region)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src="/audio/preview.mp3" />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          price={PRICE_GHS}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </>
  );
};

export default ExclusiveContent;
