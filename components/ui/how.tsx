import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="flex flex-col max-w-[550px]">
      <h2 className="font-semibold text-xl my-6">
        🔥 Get Exclusive Access to Brapurple's Unreleased Track!
      </h2>
      <div className="pb-4">
        <p className="pb-4">
          Be among the first to listen to Brapurple's unreleased song,
          <span className="text-primary">"Thanksgiving PT2 ft Hitz Magik"</span>
          . Just follow these simple steps:
        </p>
        <ol className="list-decimal list-inside flex flex-col gap-2 pl-4">
          <li>
            Fill out the form with your details
            <span className="text-primary">– quick and easy!</span>
          </li>
          <li>Generate your unique token and copy it for reference.</li>
          <li>Hit the submit button to proceed.</li>
          <li>For MoMo payments, simply use your token as the reference.</li>
        </ol>
      </div>
      {/* Payment Methods Section */}
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/images/momo-logo.png"
          alt="MTN MoMo Payment"
          width={150}
          height={50}
          className="object-contain"
        />
        <Link target="_blank" href="https://brapurple.bandcamp.com/">
          <Image
            src="/images/bandcamp.png"
            alt="Visa Payment"
            width={150}
            height={50}
            className="object-contain dark:bg-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
