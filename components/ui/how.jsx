import React from "react";

const HowItWorks = () => {
  return (
    <div className="flex flex-col max-w-[550px]">
      <h2 className="tracking-widest uppercase font-bold text-2xl my-6">
        How it <span className="text-primary">Works</span>
      </h2>
      <div className="">
        <p className="pb-4">
          To get an exclusive listen to Brapurple's unreleased track{" "}
          <span className="text-primary">(Thanks giving)</span>, follow the
          steps below:
        </p>
        <ol className="list-decimal list-inside flex flex-col gap-2 pl-4">
          <li className="">You fill the form with your information</li>
          <li>Generate a token and copy it</li>
          <li>Click the submit button</li>
          <li>If making payments with MoMo, use token as reference.</li>
        </ol>
      </div>
    </div>
  );
};

export default HowItWorks;
