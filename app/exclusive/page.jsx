"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TokenForm from "../../components/tokenForm";
import HowItWorks from "../../components/ui/how";
import { Link } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ExclusivePage = () => {
  const [isMomo, setIsMomo] = useState(false);
  const router = useRouter();

  const routeToBandCamp = () => {
    router.push("https://brapurple.bandcamp.com/");
  };

  return (
    <main className="w-full">
      <div className="container mx-auto mt-16">
        <p className="text-xl font-bold text-center my-10 pt-6">
          {`🔥Brapurple's 03:02 Releases drops exclusive for just $1. ${
            isMomo ? "Complete payment" : "Choose payment method"
          } below to get an exclusive listen.`}
        </p>

        <div className="flex gap-6 m-2 w-full justify-center">
          {!isMomo && (
            <>
              <Button onClick={routeToBandCamp} className="hover:scale-105">
                Buy with BandCamp
              </Button>
              <Button
                variant="secondary"
                className="hover:scale-105"
                onClick={() => {
                  setIsMomo(true);
                }}
              >
                Buy with Momo
              </Button>
            </>
          )}
        </div>
        {isMomo && (
          <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
            <div className="instructions max-w-[550px] px-4 md:px-0">
              <p>To pay with Momo, follow the steps below.</p>
              <ol className="list-decimal list-inside flex flex-col gap-2 pl-4">
                <li>Fill out the form with your details</li>
                <li>Generate your unique token and copy it for reference.</li>
                <li>Hit the submit button to proceed.</li>
                <li>
                  Start your momo transfer prompt. (*170# for MTN, *110# for
                  telecel, and AirtelTigo)
                </li>
                <li>Enter 20ghs or more as the amount.</li>
                <li>Use your copied token as the reference.</li>
              </ol>
            </div>
            <div className="token form max-w-[550px] px-4 md:px-0">
              <TokenForm />
            </div>
            <div className="w-full flex justify-center">
              <Button className="" onClick={() => setIsMomo(false)}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExclusivePage;
