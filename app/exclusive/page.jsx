import React from "react";
import TokenForm from "../../components/tokenForm";
import HowItWorks from "../../components/ui/how";

const ExclusivePage = () => {
  return (
    <main className="w-full h-full">
      <div className="container mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center my-10 pt-6">
          Exclusive Page
        </h1>
        <p className="text-center">
          This is an exclusive page for our members only.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-6 lg:px-0 gap-6 mt-10">
          <HowItWorks />
          <TokenForm />
        </div>
      </div>
    </main>
  );
};

export default ExclusivePage;
