import React from "react";
import Tour from "../../components/ui/tour";
import BandsintownWidget from "../../components/BandsintownWidget";

const TourPage = () => {
  return (
    <main className="mt-16 ">
      <div className="container min-h-[calc(100vh-65px)] mx-auto text-center flex flex-col items-center justify-center">
        {/* <Tour /> */}
        {/* <h1>Tour Dates</h1> */}
        {/* <p>Tours will be added shortly.. 👌👍</p> */}
        <BandsintownWidget artistName="Brapurple" />
      </div>
    </main>
  );
};

export default TourPage;
