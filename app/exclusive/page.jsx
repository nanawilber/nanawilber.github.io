"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TokenForm from "../../components/tokenForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ExclusivePage = () => {
  const [isMomo, setIsMomo] = useState(false);
  const router = useRouter();

  const routeToBandCamp = () => {
    // router.push(
    //   "https://brapurple.bandcamp.com/track/thanksgiving-pt2-ft-hitz-magik"
    // );
    window.open(
      "https://brapurple.bandcamp.com/track/thanksgiving-pt2-ft-hitz-magik",
      "_blank"
    );
  };

  return (
    <main className="w-full">
      <div className="container mx-auto mt-16 px-4 sm:px-0">
        <p className="text-xl font-bold text-center mb-10">
          Listen to "Thanksgiving PT2 ft Hitz Magik" for $1
        </p>

        <div className="flex flex-wrap gap-6 m-2 w-full justify-center">
          {!isMomo && (
            <>
              <div
                className="flex flex-col gap-3 hover:scale-105"
                onClick={() => {
                  setIsMomo(true);
                }}
              >
                <Image
                  src="/images/MTN.png"
                  width={100}
                  height={50}
                  alt="mtn momo"
                  className="object-cover w-full h-[100px]"
                />
                <span className="uppercase">For Ghana Users</span>
              </div>
              <div
                onClick={routeToBandCamp}
                className="flex flex-col gap-3 hover:scale-105"
              >
                <Image
                  src="/images/BAND.png"
                  width={100}
                  height={50}
                  alt="bandcamp"
                  className="object-cover w-full h-[100px]"
                />
                <span className="uppercase">Ghana & Rest of the World</span>
              </div>
            </>
          )}
        </div>
        {isMomo && (
          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
            <div className="instructions max-w-[550px] px-4 md:px-0">
              <p>To pay with Momo, follow the steps below.</p>
              <ol className="list-decimal list-inside flex flex-col gap-2 pl-4">
                <li>Fill the form with your details accurately</li>
                <li>Generate token and copy as your REFERENCE</li>
                <li>Hit SUBMIT</li>
                <li>Start your momo transfer prompt (eg. *170# for MTN)</li>
                <li>Send to 0559982872 (Nanabanyin Wilberforce)</li>
                <li>Enter GHC 16.99</li>
                <li>Use the generated token as your REFERENCE.</li>
                <li>Voila!, check your mail for the song and enjoy</li>
              </ol>
              {/* <div className="w-full flex justify-start mt-6">
                <Button className="" onClick={() => setIsMomo(false)}>
                  <ArrowLeft />
                  Back
                </Button>
              </div> */}
            </div>
            <div className="token form max-w-[550px] px-4 md:px-0">
              <TokenForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExclusivePage;
