import React from "react";
import HeroGrid from "../../components/heroGrid";

const NewHome = () => {
  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center border ">
      <div className="container mx-auto">
        <HeroGrid />
      </div>
    </main>
  );
};

export default NewHome;
