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
    <main className="w-full border">
      <div className="container mx-auto mt-16">
        <p className="text-xl font-bold text-center my-10 pt-6">
          Brapurple's 03:02 Releases drops exclusive for just $1. Choose payment
          method below to get an exclusive listen.
        </p>

        <div className="flex gap-2 m-2 w-full justify-center">
          <Button onClick={routeToBandCamp}>Buy with BandCamp</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setIsMomo(true);
            }}
          >
            Buy with Momo
          </Button>
        </div>
        {isMomo && (
          <div className="">
            Momo
            <Button className="" onClick={() => setIsMomo(false)}>
              Back
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExclusivePage;
