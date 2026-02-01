"use client";

import React from "react";
import HowItWorks from "../../components/ui/how";
import TokenForm from "../../components/tokenForm";
import PreSave from "../../components/PreSave";

const ExclusivePage = () => {
  return (
    <main className="mt-16">
      <div className="container min-h-[calc(100vh-65px)] my-6 mx-auto text-center flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          <HowItWorks />
          <TokenForm />
        </div>
        <PreSave />
      </div>
    </main>
  );
};

export default ExclusivePage;
